const Lazy = require('./Lazy');

class Album extends Lazy {
  async checkInstance() {
    if (!this.isInitialized) {
      const {
        agency, artist, genre, publisher, releaseDate, songIds, title,
      } = await this.createInstance();
      this.agency = agency;
      this.artist = artist;
      this.genre = genre;
      this.publisher = publisher;
      this.releaseDate = releaseDate;
      this.songIds = songIds;
      this.title = title;
      this.isInitialized = true;
    }
  }

  async getAgency() {
    await this.checkInstance();
    return this.agency;
  }

  async getArtist() {
    await this.checkInstance();
    return this.artist;
  }

  async getGenre() {
    await this.checkInstance();
    return this.genre;
  }

  async getPublisher() {
    await this.checkInstance();
    return this.publisher;
  }

  async getReleaseDate() {
    await this.checkInstance();
    return this.releaseDate;
  }

  async getSongIds() {
    await this.checkInstance();
    return this.songIds;
  }

  async getTitle() {
    await this.checkInstance();
    return this.title;
  }
}

module.exports = Album;
