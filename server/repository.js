export class Repository {
  #repository;

  constructor(db, dbName) {
    this.#repository = db(dbName);
  }

  async getAll() {
    return this.#repository.find;
  }
}
