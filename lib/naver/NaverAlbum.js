const jsdom = require('jsdom');
const request = require('request');

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
          const meta = document.querySelectorAll('ul.u_lst2 > li.uc_lst > span')[1].innerHTML;
          const agency = null;
          const artist = document.querySelector('ul.u_lst2 > li.uc_lst > span > a').innerHTML;
          const genre = meta.match(/^\s+(.+)<span/)[1];
          const publisher = null;
          const releaseDate = meta.match(/<\/span>(\d{4}\.\d{2}\.\d{2})/)[1];
          const songIds = Array.from(document.querySelectorAll('ul.cont_list > li > a.inner'))
            .map(element => element.outerHTML.match(/goTrack\((\d+),/)[1].toString());
          const title = document.querySelector('ul.u_lst2 > li.uc_tit > span').innerHTML;
          resolve({
            agency,
            artist,
            genre,
            publisher,
            releaseDate,
            songIds,
            title,
          });
        }
      });
    });
  }
}

module.exports = NaverAlbum;
