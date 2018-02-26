const Lazy = require('./Lazy');

class Album extends Lazy {
  async checkInstance() {
    if (!this.isInitialized) {
      const {
        agency, artist, genre, publisher, releaseDate, songs, title,
      } = await this.createInstance();
      this.agency = agency;
      this.artist = artist;
      this.genre = genre;
      this.publisher = publisher;
      this.releaseDate = releaseDate;
      this.songs = songs;
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

  async getSongs() {
    await this.checkInstance();
    return this.songs;
  }

  async getTitle() {
    await this.checkInstance();
    return this.title;
  }
}

module.exports = Album;
