class Song {
  constructor(title, artist, album, lyric) {
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.lyric = lyric;
  }

  getAlbum() {
    return this.album;
  }

  getArtist() {
    return this.artist;
  }

  getLyric() {
    return this.lyric;
  }

  getTitle() {
    return this.title;
  }

  static get Builder() {
    class Builder {
      build() {
        return new Song(this.title, this.artist, this.album, this.lyric);
      }

      setAlbum(album) {
        this.album = album;
        return this;
      }

      setArtist(artist) {
        this.artist = artist;
        return this;
      }

      setLyric(lyric) {
        this.lyric = lyric;
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

module.exports = Song;
