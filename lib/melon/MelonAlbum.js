const jsdom = require('jsdom');
const request = require('request');

const MelonSong = require('./MelonSong');
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
      request.get(`http://www.melon.com/album/detail.htm?albumId=${albumId}`, (err, httpResponse, body) => {
        if (err) {
          reject(err);
        } else {
          const { document } = (new JSDOM(body)).window;
          const title = document.querySelector('.info > .song_name').innerHTML.match(/(?:\t)+(.+)\n(?:\t)+$/)[1];
          const artist = document.querySelector('.info > .artist > .artist_name').title;
          const meta = document.querySelector('.meta > .list').innerHTML;
          const releaseDate = meta.match(/<dt>발매일<\/dt>\n\t\t\t\t\t\t\t\t\t\t<dd>(\d{4}\.\d{2}\.\d{2})<\/dd>/)[1];
          const genre = meta.match(/<dt>장르<\/dt>\n\t\t\t\t\t\t\t\t\t\t<dd>(.+)<\/dd>/)[1];
          const publisher = meta.match(/<dt>발매사<\/dt>\n\t\t\t\t\t\t\t\t\t\t<dd>(.+)<\/dd>/)[1];
          const agency = meta.match(/<dt>기획사<\/dt>\n\t\t\t\t\t\t\t\t\t\t<dd>(.+)<\/dd>/)[1];
          const songs = Array.from(document.querySelectorAll('.song_list tr > td > .wrap > a.type03.song_info'))
            .filter(element => element.href && element.href.includes('goSongDetail'))
            .map(element => new MelonSong(element.href.match(/goSongDetail\('(\d+)'\)/)[1]));
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

module.exports = MelonAlbum;
