const { genie, melon, naver } = require('../lib');

melon.getDailyChart().then(async (songs) => {
  const song = songs[0];
  console.log(`Title: ${await song.getTitle()}`);
  console.log(`Artist: ${await song.getArtist()}`);
  console.log(`Lyric: ${await song.getLyric()}`);
  const album = await song.getAlbum();
  console.log(`Album Title: ${await album.getTitle()}`);
  console.log(`Genre: ${await album.getGenre()}`);
  console.log(`Release Date: ${await album.getReleaseDate()}`);
  console.log(`Agency: ${await album.getAgency()}`);
  console.log(`Publisher: ${await album.getPublisher()}`);
  console.log(`Song Ids: ${await album.getSongIds()}`);
});
