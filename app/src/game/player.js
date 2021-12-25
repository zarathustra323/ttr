import Graph from '../../data/graph';

export default class GamePlayer {
  constructor({ color, name } = {}) {
    this.name = name;
    this.color = color;
    this.graph = new Graph();

    this.score = 0;
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

    this.score += edge.data.points;
    this.piecesUsed += edge.data.length;

    return this;
  }

  serialize() {
    return {
      name: this.name,
      color: this.color,
      graph: this.graph.serialize(),
      score: this.score,
      piecesUsed: this.piecesUsed,
    };
  }

  static deserialize(o) {
    const instance = new GamePlayer({ color: o.color, name: o.name });
    instance.graph = Graph.deserialize(o.graph);
    instance.score = o.score;
    instance.piecesUsed = o.piecesUsed;
    return instance;
  }
}
