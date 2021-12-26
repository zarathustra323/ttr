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

    this.ticketGraph = new Graph();
    this.data.tickets.forEach((ticket) => {
      const [fromName, toName] = ticket.cities;
      this.ticketGraph.addEdge({
        from: { id: fromName, name: fromName },
        to: { id: toName, name: toName },
        data: { points: ticket.points },
      });
    });

    this.players = new Map();
  }

  getLocation({ id }) {
    const node = this.graph.getNode({ id });
    if (!node) throw new Error(`No location was found for ${id}`);
    return node;
  }

  getTicketLocation({ id }) {
    const node = this.ticketGraph.getNode({ id });
    if (!node) throw new Error(`No ticket location was found for ${id}`);
    return node;
  }

  claimRoute({
    fromId,
    toId,
    colorId,
    playerColorId,
  } = {}) {
    this.validateHasPlayer({ colorId: playerColorId });
    const player = this.players.get(playerColorId);

    const nodes = {
      from: this.getLocation({ id: fromId }),
      to: this.getLocation({ id: toId }),
    };

    const edge = this.graph.getEdge({ fromNodeId: fromId, toNodeId: toId, edgeId: colorId });
    if (!edge) throw new Error(`No ${colorId} color route found between ${nodes.data.name} and ${nodes.to.name}`);
    const { claimedBy } = edge.data;
    if (claimedBy) {
      throw new Error(`The ${colorId} route between ${fromId} and ${toId} has already been claimed by the ${claimedBy.color.id} player ${claimedBy.name}`);
    }
    const nodeMap = new Map([
      [nodes.from.getId(), nodes.from],
      [nodes.to.getId(), nodes.to],
    ]);
    player.claimEdge({ nodeMap, edge });
    edge.appendData({ claimedBy: player });
    return this;
  }

  removeRoute({
    edge,
    playerColorId,
  } = {}) {
    this.validateHasPlayer({ colorId: playerColorId });
    const player = this.players.get(playerColorId);
    player.removeEdge({ edge });
    this.graph.getEdgeById({ id: edge.getId() }).appendData({ claimedBy: null });
    return this;
  }

  claimTicket({
    fromId,
    toId,
    playerColorId,
  } = {}) {
    this.validateHasPlayer({ colorId: playerColorId });
    const player = this.players.get(playerColorId);

    const nodes = {
      from: this.getTicketLocation({ id: fromId }),
      to: this.getTicketLocation({ id: toId }),
    };

    const edge = this.ticketGraph.getEdge({ fromNodeId: fromId, toNodeId: toId });
    if (!edge) throw new Error(`No ticket route found between ${nodes.from.name} and ${nodes.to.name}`);
    const { claimedBy } = edge.data;
    if (claimedBy) {
      throw new Error(`The ticket route between ${fromId} and ${toId} has already been claimed by the ${claimedBy.color.id} player ${claimedBy.name}`);
    }
    const nodeMap = new Map([
      [nodes.from.getId(), nodes.from],
      [nodes.to.getId(), nodes.to],
    ]);
    player.claimTicket({ nodeMap, edge });
    edge.appendData({ claimedBy: player });
    return this;
  }

  removeTicket({
    edge,
    playerColorId,
  } = {}) {
    this.validateHasPlayer({ colorId: playerColorId });
    const player = this.players.get(playerColorId);
    player.removeTicket({ edge });
    this.ticketGraph.getEdgeById({ id: edge.getId() }).appendData({ claimedBy: null });
    return this;
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
      ticketGraph: this.ticketGraph.serialize(),
      players: [...this.players].map(([id, player]) => [id, player.serialize()]),
    };
  }

  static deserialize(o) {
    const instance = new Game({ typeId: o.typeId });
    instance.id = o.id;
    instance.created = o.created;
    instance.graph = Graph.deserialize(o.graph);
    instance.ticketGraph = Graph.deserialize(o.ticketGraph);
    instance.players = new Map();
    o.players.forEach(([id, data]) => {
      instance.players.set(id, GamePlayer.deserialize(data));
    });
    return instance;
  }
}
