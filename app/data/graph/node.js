import createId from '../utils/create-id';

export default class Node {
  constructor({ id, name, data } = {}) {
    this.id = Node.createId(id);
    this.name = name;
    this.setData(data);
    this.edges = new Set();
    this.neighbors = new Map();
  }

  addEdge(edge) {
    this.edges.add(edge.getId());
    const destinationNodeId = edge.fromId === this.id ? edge.toId : edge.fromId;
    const { neighbors } = this;
    if (!neighbors.has(destinationNodeId)) neighbors.set(destinationNodeId, new Set());
    neighbors.get(destinationNodeId).add(edge.getId());
    return this;
  }

  removeEdge(edge) {
    this.edges.delete(edge.getId());
    const destinationNodeId = edge.fromId === this.id ? edge.toId : edge.fromId;
    const { neighbors } = this;
    if (neighbors.has(destinationNodeId)) {
      const destinationEdgeIds = neighbors.get(destinationNodeId);
      destinationEdgeIds.delete(edge.getId());
      if (!destinationEdgeIds.size) neighbors.delete(destinationNodeId);
    }
    return this;
  }

  getId() {
    return this.id;
  }

  setData(data) {
    this.data = data;
  }

  appendData(data) {
    this.data = { ...this.data, ...data };
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      data: this.data,
      edges: [...this.edges],
      neighbors: [...this.neighbors].map(([id, set]) => [id, [...set]]),
    };
  }

  static deserialize(o) {
    const instance = new Node({ id: o.id, name: o.name, data: o.data });
    instance.edges = new Set(o.edges);
    instance.neighbors = new Map();
    o.neighbors.forEach(([id, edgeIds]) => {
      instance.neighbors.set(id, new Set(edgeIds));
    });
    return instance;
  }

  static createId(value) {
    return createId(value);
  }
}
