class Album {
  constructor(title, artist, songs, genre, releaseDate, publisher, agency) {
    this.title = title;
    this.artist = artist;
    this.songs = songs;
    this.genre = genre;
    this.releaseDate = releaseDate;
    this.publisher = publisher;
    this.agency = agency;
  }

  getAgency() {
    return this.agency;
  }

  getArtist() {
    return this.artist;
  }

  getGenre() {
    return this.genre;
  }

  getPublisher() {
    return this.publisher;
  }

  getReleaseDate() {
    return this.releaseDate;
  }

  getSongs() {
    return this.songs;
  }

  getTitle() {
    return this.title;
  }

  static get Builder() {
    class Builder {
      build() {
        return new Album(
          this.title, this.artist, this.songs,
          this.genre, this.releaseDate, this.publisher, this.agency,
        );
      }

      setAgency(agency) {
        this.agency = agency;
        return this;
      }

      setArtist(artist) {
        this.artist = artist;
        return this;
      }

      setGenre(genre) {
        this.genre = genre;
        return this;
      }

      setPublisher(publisher) {
        this.publisher = publisher;
        return this;
      }

      setReleaseDate(releaseDate) {
        this.releaseDate = releaseDate;
        return this;
      }

      setSongs(songs) {
        this.songs = songs;
        return this;
      }

      setTitle(title) {
        this.title = title;
        return this;
      }
    }
    return Builder;
  }
}

module.exports = Album;
