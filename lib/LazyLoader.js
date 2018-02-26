class LazyLoader {
  constructor() {
    this.instance = null;
  }

  createInstance() {
    throw new Error('LazyLoader class must be extended.');
  }

  async getInstance() {
    const { instance } = this;
    if (instance === null) {
      const rawInstance = this.createInstance();
      if (rawInstance instanceof Promise) {
        this.instance = await rawInstance;
      } else {
        this.instance = rawInstance;
      }
      return rawInstance;
    }
    return instance;
  }
}

module.exports = LazyLoader;
