const Lazy = require('./Lazy');

class Song extends Lazy {
  async checkInstance() {
    if (!this.isInitialized) {
      const {
        album, artist, lyric, title,
      } = await this.createInstance();
      this.album = album;
      this.artist = artist;
      this.lyric = lyric;
      this.title = title;
      this.isInitialized = true;
    }
  }

  async getAlbum() {
    await this.checkInstance();
    return this.album;
  }

  async getArtist() {
    await this.checkInstance();
    return this.artist;
  }

  async getLyric() {
    await this.checkInstance();
    return this.lyric;
  }

  async getTitle() {
    await this.checkInstance();
    return this.title;
  }
}

module.exports = Song;
