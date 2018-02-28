const jsdom = require('jsdom');
const request = require('request');

const Album = require('../Album');

const { JSDOM } = jsdom;

class MelonAlbum extends Album {
  constructor(albumId) {
    super();
    this.albumId = albumId;
  }

  createInstance() {
    const { albumId } = this;
    return new Promise((resolve, reject) => {
      request.get(`http://www.genie.co.kr/detail/albumInfo?axnm=${albumId}`, (err, httpResponse, body) => {
        if (err) {
          reject(err);
        } else {
          const { document } = (new JSDOM(body)).window;
          const meta = document.querySelector('.info-zone > .info-data').innerHTML;
          const agency = meta.match(/"기획사"><\/span> <span class="value">(.+)<\/span>/)[1];
          const artist = meta.match(/fnGoMore\('artistInfo','\d+'\);return false;">(.+)</)[1];
          const genre = meta.match(/"장르\/스타일"><\/span> <span class="value">(.+)<\/span>/)[1];
          const publisher = meta.match(/"발매사"><\/span> <span class="value">(.+)<\/span>/)[1];
          const releaseDate = meta.match(/"발매일"><\/span> <span class="value">(\d{4}\.\d{2}\.\d{2})/)[1];
          const songIds = Array.from(document.querySelectorAll('.music-list-wrap > .list-wrap > tbody > .list > .info > .title'))
            .map(element => element.outerHTML.match(/fnPlaySong\('(\d+)/)[1].toString());
          const title = document.querySelector('.info-zone > h2.name').textContent;
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

module.exports = MelonAlbum;
