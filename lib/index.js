const melon = require('./melon');

module.exports = {
  melon,
};

melon.getDailyChart().then(async (songs) => {
  const song = await songs[0].getInstance();
  console.log(song.getTitle());
  console.log(song.getArtist());
  console.log(song.getLyric());
  const album = await song.getAlbum().getInstance();
  console.log(album.getTitle());
});
