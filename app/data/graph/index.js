import Edge from './edge';
import Node from './node';

export default class Graph {
  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
  }

  addNode({ id, name, data } = {}) {
    if (!this.hasNode({ id })) {
      const node = new Node({ id, name, data });
      this.nodes.set(node.getId(), node);
    }
    return this;
  }

  hasNode({ id } = {}) {
    return Boolean(this.getNode({ id }));
  }

  getNode({ id } = {}) {
    if (!id) throw new Error('A node ID must be provided.');
    return this.nodes.get(Node.createId(id));
  }

  getNeighborsFor({ id } = {}) {
    const node = this.getNode({ id });
    if (!node) return undefined;
    const neighbors = new Map();
    node.neighbors.forEach((edgeIds, neighborId) => {
      const neighborNode = this.getNode({ id: neighborId });
      if (!neighborNode) return;
      const edges = new Map();
      edgeIds.forEach((edgeId) => {
        const edge = this.edges.get(edgeId);
        if (edge) edges.set(edge.getId(), edge);
      });
      neighbors.set(neighborId, { node: neighborNode, edges });
    });
    return neighbors;
  }

  addEdge({
    from,
    to,
    id,
    data,
  } = {}) {
    if (!this.hasEdge({ fromNodeId: from.id, toNodeId: to.id, edgeId: id })) {
      this.addNode(from).addNode(to);

      const fromNode = this.getNode({ id: from.id });
      const toNode = this.getNode({ id: to.id });
      const edge = new Edge({
        fromNodeId: fromNode.getId(),
        toNodeId: toNode.getId(),
        edgeId: id,
        data,
      });

      this.edges.set(edge.getId(), edge);

      // non-directional, e.g. two-way edges
      fromNode.addEdge(edge);
      toNode.addEdge(edge);
    }
  }

  hasEdge({ fromNodeId, toNodeId, edgeId } = {}) {
    return Boolean(this.getEdge({ fromNodeId, toNodeId, edgeId }));
  }

  getEdge({ fromNodeId, toNodeId, edgeId } = {}) {
    return this.edges.get(Edge.createId({ fromNodeId, toNodeId, edgeId }));
  }

  serialize() {
    return {
      nodes: [...this.nodes].map(([id, node]) => [id, node.serialize()]),
      edges: [...this.edges].map(([id, edge]) => [id, edge.serialize()]),
    };
  }

  static deserialize(o) {
    const instance = new Graph();
    instance.nodes = new Map();
    o.nodes.forEach(([id, data]) => {
      instance.nodes.set(id, Node.deserialize(data));
    });
    instance.edges = new Map();
    o.edges.forEach(([id, data]) => {
      instance.edges.set(id, Edge.deserialize(data));
    });
    return instance;
  }
}
