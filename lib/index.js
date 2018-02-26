const melon = require('./melon');

module.exports = {
  melon,
};

melon.getDailyChart().then(async (songs) => {
  const song = songs[0];
  console.log(await song.getTitle());
  console.log(await song.getArtist());
  console.log(await song.getLyric());
  const album = await song.getAlbum();
  console.log(await album.getTitle());
});
