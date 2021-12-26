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

  serialize() {
    const [nodeIds, edgeId] = this.id.split('__');
    const [fromNodeId, toNodeId] = nodeIds.split('.');
    return {
      fromNodeId,
      toNodeId,
      edgeId,
      data: this.data,
    };
  }

  static deserialize(o) {
    return new Edge({
      fromNodeId: o.fromNodeId,
      toNodeId: o.toNodeId,
      edgeId: o.edgeId,
      data: o.data,
    });
  }

  static createId({ fromNodeId, toNodeId, edgeId } = {}) {
    const { createId } = Node;
    const elements = [fromNodeId, toNodeId].sort();
    const nodesId = `${elements.map(createId).join('.')}`;
    if (!edgeId) return nodesId;
    return `${nodesId}__${createId(edgeId)}`;
  }
}
