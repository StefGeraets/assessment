type NodeId = number;

export type NodeTypeBase = {
  id: NodeId;
  next: NodeId;
}

export interface InputNode extends NodeTypeBase {
  type: "input";
  varName: string;
}

export interface OutputNode extends NodeTypeBase {
  type: "output";
  text: string;
}

export interface DelayNode extends NodeTypeBase {
  type: "delay";
  delay: number;
}

export interface CoinNode {
  id: NodeId;
  type: "coin";
  head: NodeId;
  tail: NodeId;
}

export type NodeTypes = InputNode | OutputNode | DelayNode | CoinNode;
export type NodeTypeKind = NodeTypes["type"];