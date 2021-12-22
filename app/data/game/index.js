import createId from '../utils/create-id';
import Elements from './elements';

export default class GameData {
  constructor({
    name,
    playerColors = [],
    cities = [],
    routes = [],
    scoring = {},
    piecesPerPlayer = [],
    minPlayers = 2,
  } = {}) {
    this.id = createId(name);
    this.name = name;
    this.scoring = scoring;

    this.minPlayers = minPlayers;
    this.maxPlayers = playerColors.length;

    this.piecesPerPlayer = piecesPerPlayer;

    this.playerColors = new Elements({ gameId: this.id, names: playerColors });
    this.cities = new Elements({ gameId: this.id, names: cities });

    const routeColors = new Set();
    this.routes = routes.map((route) => {
      const [from, to] = route.cities;
      if (!this.cities.has(from)) throw new Error(`No destination found for ${from}`);
      if (!this.cities.has(to)) throw new Error(`No destination found for ${to}`);
      if (!route.length) throw new Error(`No route length was set for ${route.cities}`);

      const points = this.scoring[route.length];
      if (points == null) throw new Error(`Unable to get points for route length ${route.length}`);

      route.colors.forEach((color) => routeColors.add(color));
      return { ...route, points };
    });

    this.routeColors = new Elements({ gameId: this.id, names: [...routeColors] });
  }

  getPlayerColor(idOrName) {
    const colorId = createId(idOrName);
    const color = this.playerColors.get(colorId);
    if (!color) throw new Error(`No player color found for ${colorId}`);
    return color;
  }
}
