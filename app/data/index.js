import ClassicGameData from './classic';

export default new Map([
  new ClassicGameData(),
].map((game) => [game.id, game]));
