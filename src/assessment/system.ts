import { InputNode, NodeId, NodeTypes } from "./index.d"


export const nodeHandler = (nodes: NodeTypes[]) => {
  const systemVars: {[K: string]: string}[] = [];

  const inputHandler = (node: InputNode, inputValue: string) => {
    systemVars.push({[`$${node.varName}`]: inputValue});
    nextNodeById(node.next);
  }

  const nextNodeById = (id: NodeId): void => {
    executeNodeByType(nodes[id]);
  }

  const executeNodeByType = (node: NodeTypes): void => {
    switch (node.type) {
      case "input":
        inputHandler(node, "do this");
        break;
      default:
        break;
    }
  }

  return {inputHandler, systemVars}
}

