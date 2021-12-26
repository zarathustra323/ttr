import Graph from '../../data/graph';

export default class GamePlayer {
  constructor({ color, name } = {}) {
    this.name = name;
    this.color = color;
    this.graph = new Graph();
    this.ticketGraph = new Graph();

    this.score = { pieces: 0, tickets: 0 };
    this.piecesUsed = 0;
  }

  claimEdge({ nodeMap, edge } = {}) {
    const from = nodeMap.get(edge.fromId);
    const to = nodeMap.get(edge.toId);

    this.graph.addEdge({
      from: { id: from.id, name: from.name, data: from.data },
      to: { id: to.id, name: to.name, data: to.data },
      id: edge.data.color,
      data: { ...edge.data },
    });

    this.score.pieces += edge.data.points;
    this.piecesUsed += edge.data.length;

    return this;
  }

  removeEdge({ edge } = {}) {
    this.graph.removeEdge({ edge });
    this.score.pieces -= edge.data.points;
    this.piecesUsed -= edge.data.length;

    this.graph.nodes.forEach((node) => {
      if (!node.neighbors.size) {
        // remove empty nodes from player graph
        this.graph.removeNode({ id: node.id });
      }
    });

    return this;
  }

  claimTicket({ nodeMap, edge } = {}) {
    const from = nodeMap.get(edge.fromId);
    const to = nodeMap.get(edge.toId);

    let resolvedPoints = edge.data.points;
    if (!from || !to) {
      resolvedPoints *= -1;
    } else {
      // check for complete route!
      console.log('check for ticket completion!');
    }

    this.ticketGraph.addEdge({
      from: { id: from.id, name: from.name, data: from.data },
      to: { id: to.id, name: to.name, data: to.data },
      data: { ...edge.data, resolvedPoints },
    });

    this.score.tickets += resolvedPoints;

    return this;
  }

  removeTicket({ edge } = {}) {
    this.ticketGraph.removeEdge({ edge });
    this.score.tickets -= edge.data.resolvedPoints;

    this.ticketGraph.nodes.forEach((node) => {
      if (!node.neighbors.size) {
        // remove empty nodes from player graph
        this.ticketGraph.removeNode({ id: node.id });
      }
    });

    return this;
  }

  serialize() {
    return {
      name: this.name,
      color: this.color,
      graph: this.graph.serialize(),
      ticketGraph: this.ticketGraph.serialize(),
      score: this.score,
      piecesUsed: this.piecesUsed,
    };
  }

  static deserialize(o) {
    const instance = new GamePlayer({ color: o.color, name: o.name });
    instance.graph = Graph.deserialize(o.graph);
    instance.score = o.score;
    instance.ticketGraph = Graph.deserialize(o.ticketGraph);
    instance.piecesUsed = o.piecesUsed;
    return instance;
  }
}
