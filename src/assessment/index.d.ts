type NodeId = number;

export type NodeTypeBase = {
  id: NodeId;
  next: NodeId;
}

export interface InputNode extends NodeTypeBase {
  type: "input";
  varName: string;
}

export type OutputNode = {
  type: "output";
  text: string;
}

export type DelayNode = {
  type: "delay";
  delay: number;
}

export type CoinNode = {
  id: NodeId;
  type: "coin";
  head: NodeId;
  tail: NodeId;
}

export type NodeTypes = InputNode | OutputNode | DelayNode | CoinNode;
export type NodeTypeKind = NodeTypes["type"];