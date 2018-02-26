const jsdom = require('jsdom');
const request = require('request');

const NaverSong = require('./NaverSong');

const { JSDOM } = jsdom;

const getDailyChart = () => new Promise((resolve, reject) => {
  request.get('http://music.naver.com/listen/top100.nhn?domain=TOTAL', (err, httpResponse, body) => {
    if (err) {
      reject(err);
    } else {
      const { document } = (new JSDOM(body)).window;
      const songs = Array.from(document.querySelectorAll('.tracklist_table > table > tbody > tr._tracklist_move'))
        .filter(element => !element.outerHTML.includes('display:none;'))
        .map(element => new NaverSong(element.outerHTML.split('|')[0].split('trackdata="')[1]));
      resolve(songs);
    }
  });
});

exports.getDailyChart = getDailyChart;
