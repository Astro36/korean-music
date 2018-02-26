const jsdom = require('jsdom');
const request = require('request');

const NaverAlbum = require('./NaverAlbum');
const Song = require('../Song');

const { JSDOM } = jsdom;

class NaverSong extends Song {
  constructor(songId) {
    super();
    this.songId = songId;
  }

  createInstance() {
    const { songId } = this;
    return new Promise((resolve, reject) => {
      request.get(`http://m.music.naver.com/track/index.nhn?trackId=${songId}`, (err, httpResponse, body) => {
        if (err) {
          reject(err);
        } else {
          const { document } = (new JSDOM(body)).window;
          const title = document.querySelector('h1#titleArea > span').innerHTML;
          const meta = document.querySelector('dl.art_name').innerHTML;
          const artist = meta.match(/goArtist\(\d+\);">(.+)</)[1];
          const album = new NaverAlbum(meta.match(/goAlbum\((\d+)\)/)[1]);
          const lyric = document.querySelector('.mu_lyric').innerHTML
            .replace(/<br>/g, '\n')
            .trim();
          resolve({
            album,
            artist,
            lyric,
            title,
          });
        }
      });
    });
  }
}

module.exports = NaverSong;
