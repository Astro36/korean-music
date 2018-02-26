class Lazy {
  constructor() {
    this.instance = null;
  }

  async checkInstance() {
    throw new Error('Lazy class must be extended.');
  }

  createInstance() {
    throw new Error('Lazy class must be extended.');
  }
}

module.exports = Lazy;
