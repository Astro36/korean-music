const jsdom = require('jsdom');
const request = require('request');

const GenieSong = require('./GenieSong');

const { JSDOM } = jsdom;

const getDailyChart = () => new Promise((resolve, reject) => {
  request.get('http://www.genie.co.kr/chart/top200?ditc=D&rtm=N', (err, httpResponse, body) => {
    if (err) {
      reject(err);
    } else {
      const { document } = (new JSDOM(body)).window;
      const songs = Array.from(document.querySelectorAll('.music-list-wrap > .list-wrap > tbody > .list > .info > .title'))
        .map(element => new GenieSong(element.outerHTML.match(/fnPlaySong\('(\d+)'/)[1]));
      resolve(songs);
    }
  });
});

exports.getDailyChart = getDailyChart;
