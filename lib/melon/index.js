const jsdom = require('jsdom');
const request = require('request');

const MelonSong = require('./MelonSong');

const { JSDOM } = jsdom;

const getDailyChart = () => new Promise((resolve, reject) => {
  request.get('http://www.melon.com/chart/day/index.htm', (err, httpResponse, body) => {
    if (err) {
      reject(err);
    } else {
      const { document } = (new JSDOM(body)).window;
      const songs = Array.from(document.querySelectorAll('.lst50 > td > .wrap.t_right > .input_check'))
        .filter(element => element.value)
        .map(element => new MelonSong(element.value));
      resolve(songs);
    }
  });
});

exports.getDailyChart = getDailyChart;
