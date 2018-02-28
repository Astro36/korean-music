const jsdom = require('jsdom');
const request = require('request');

const GenieAlbum = require('./GenieAlbum');
const Song = require('../Song');

const { JSDOM } = jsdom;

class GenieSong extends Song {
  constructor(songId) {
    super();
    this.songId = songId;
  }

  createInstance() {
    const { songId } = this;
    return new Promise((resolve, reject) => {
      request.get(`http://www.genie.co.kr/detail/songInfo?xgnm=${songId}`, (err, httpResponse, body) => {
        if (err) {
          reject(err);
        } else {
          const { document } = (new JSDOM(body)).window;
          const meta = document.querySelector('.info-zone > .info-data').innerHTML;
          const album = new GenieAlbum(meta.match(/fnGoMore\('albumInfo','(.+)'\)/)[1]);
          const artist = meta.match(/fnGoMore\('artistInfo','\d+'\);return false;">(.+)<\/a>/)[1];
          const lyric = document.querySelector('p#pLyrics').textContent.trim();
          const title = document.querySelector('.info-zone > h2.name').textContent.trim();
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

module.exports = GenieSong;
