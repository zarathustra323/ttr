import createId from '../utils/create-id';

export default class Node {
  constructor({ id, data } = {}) {
    this.id = Node.createId(id);
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

  static createId(value) {
    return createId(value);
  }
}
