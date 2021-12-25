import gameData from '../../data';
import Graph from '../../data/graph';
import GamePlayer from './player';

export default class Game {
  constructor({ typeId } = {}) {
    const now = new Date();
    this.id = now.valueOf();
    this.created = now;
    this.typeId = typeId;
    this.data = gameData.get(typeId);
    if (!this.data) throw new Error(`Unable to load data for game type ID ${typeId}`);

    this.graph = new Graph();
    this.data.routes.forEach((route) => {
      const [fromName, toName] = route.cities;
      route.colors.forEach((color) => {
        this.graph.addEdge({
          from: { id: fromName, name: fromName },
          to: { id: toName, name: toName },
          id: color,
          data: { color, length: route.length, points: route.points },
        });
      });
    });

    this.players = new Map();
  }

  addPlayer({ name, colorId } = {}) {
    if (!colorId) throw new Error('A player color ID is required');
    if (!name) throw new Error('The player must have a name');
    const color = this.data.getPlayerColor(colorId);
    if (this.players.has(color.id)) {
      throw new Error(`A player has already been added for color ${color.id}`);
    }
    this.players.set(color.id, new GamePlayer({ name, color: { id: color.id, name: color.name } }));
    return this;
  }

  hasPlayer({ colorId } = {}) {
    return this.players.has(colorId);
  }

  removePlayer({ colorId } = {}) {
    this.validateHasPlayer({ colorId });
    this.players.delete(colorId);
    return this;
  }

  validateHasPlayer({ colorId } = {}) {
    if (!this.hasPlayer({ colorId })) throw new Error(`No player has been added for color ${colorId}`);
    return true;
  }

  serialize() {
    return {
      id: this.id,
      created: this.created.valueOf(),
      typeId: this.typeId,
      graph: this.graph.serialize(),
      players: [...this.players].map(([id, player]) => [id, player.serialize()]),
    };
  }

  static deserialize(o) {
    const instance = new Game({ typeId: o.typeId });
    instance.id = o.id;
    instance.created = o.created;
    instance.graph = Graph.deserialize(o.graph);
    instance.players = new Map();
    o.players.forEach(([id, data]) => {
      instance.players.set(id, GamePlayer.deserialize(data));
    });
    return instance;
  }
}
