import Node from './node';

export default class Edge {
  constructor({
    fromNodeId,
    toNodeId,
    edgeId,
    data,
  } = {}) {
    this.id = Edge.createId({ fromNodeId, toNodeId, edgeId });
    const [from, to] = [fromNodeId, toNodeId].map(Node.createId).sort();
    this.fromId = from;
    this.toId = to;
    this.setData(data);
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

  static createId({ fromNodeId, toNodeId, edgeId } = {}) {
    const { createId } = Node;
    const elements = [fromNodeId, toNodeId].sort();
    return `${elements.map(createId).join('.')}__${createId(edgeId)}`;
  }
}
