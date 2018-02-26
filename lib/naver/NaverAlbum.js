const jsdom = require('jsdom');
const request = require('request');

const NaverSong = require('./NaverSong');
const Album = require('../Album');

const { JSDOM } = jsdom;

class NaverAlbum extends Album {
  constructor(albumId) {
    super();
    this.albumId = albumId;
  }

  createInstance() {
    const { albumId } = this;
    return new Promise((resolve, reject) => {
      request.get(`http://m.music.naver.com/album/index.nhn?albumId=${albumId}`, (err, httpResponse, body) => {
        if (err) {
          reject(err);
        } else {
          const { document } = (new JSDOM(body)).window;
          const title = document.querySelector('ul.u_lst2 > li.uc_tit > span').innerHTML;
          const artist = document.querySelector('ul.u_lst2 > li.uc_lst > span > a').innerHTML;
          const meta = document.querySelectorAll('ul.u_lst2 > li.uc_lst > span')[1].innerHTML;
          const releaseDate = meta.match(/<\/span>(\d{4}\.\d{2}\.\d{2})/)[1];
          const genre = meta.match(/^\s+(.+)/)[1];
          const publisher = null;
          const agency = null;
          const songs = Array.from(document.querySelectorAll('ul.cont_list > li > a.inner'))
            .map(element => new NaverSong(element.outerHTML.match(/goTrack\((\d+),/)[1]));
          resolve({
            agency,
            artist,
            genre,
            publisher,
            releaseDate,
            songs,
            title,
          });
        }
      });
    });
  }
}

module.exports = NaverAlbum;
