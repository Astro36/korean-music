const jsdom = require('jsdom');
const request = require('request');

const MelonAlbumLazyLoader = require('./MelonAlbumLazyLoader');
const MelonSong = require('./MelonSong');
const LazyLoader = require('../LazyLoader');

const { JSDOM } = jsdom;

class MelonSongLazyLoader extends LazyLoader {
  constructor(songId) {
    super();
    this.songId = songId;
  }

  createInstance() {
    const { songId } = this;
    return new Promise((resolve, reject) => {
      request.get(`http://www.melon.com/song/detail.htm?songId=${songId}`, (err, httpResponse, body) => {
        if (err) {
          reject(err);
        } else {
          const { document } = (new JSDOM(body)).window;
          const title = document.querySelector('.info > .song_name').innerHTML.match(/(?:\t)+(.+)\n(?:\t)+$/)[1];
          const artist = document.querySelector('.info > .artist > .artist_name').title;
          const meta = document.querySelector('.meta > .list').innerHTML;
          const album = new MelonAlbumLazyLoader(meta.match(/goAlbumDetail\('(\d+)'\)/)[1]);
          const lyric = document.querySelector('.wrap_lyric > .lyric').innerHTML
            .match(/(?:\t)+(.+)\n(?:\t)+$/)[1]
            .replace(/<br>/g, '\n')
            .trim();
          const song = new MelonSong.Builder()
            .setAlbum(album)
            .setArtist(artist)
            .setLyric(lyric)
            .setTitle(title)
            .build();
          resolve(song);
        }
      });
    });
  }
}

module.exports = MelonSongLazyLoader;
