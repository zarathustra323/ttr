import createId from '../utils/create-id';

export default class Element {
  /**
   *
   * @param {object} params
   * @param {string} params.gameId
   * @param {string} params.name
   */
  constructor({ gameId, name } = {}) {
    this.gameId = gameId;
    this.id = createId(name);
    this.name = name;
  }
}
