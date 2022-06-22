import { InputNode, NodeId, NodeTypes, OutputNode } from "./index.d"


export const nodeHandler = (nodes: NodeTypes[]) => {
  const systemVars: {[K: string]: string}[] = [];

  const getInputValue = (inputValue?: string): string => {
    return inputValue ? inputValue : "standard input";
  }

  const inputHandler = (node: InputNode) => {
    const inputValue = getInputValue();
    systemVars.push({[`$${node.varName}`]: inputValue});
    nextNodeById(node.next);
  }

  const outputHandler = (node: OutputNode) => {
    printToConsole(node.text);
    nextNodeById(node.next);
  }

  const printToConsole = (input: string): void => {
    console.log(input);
  }

  const nextNodeById = (id: NodeId): void => {
    executeNodeByType(nodes[id]);
  }

  const executeNodeByType = (node: NodeTypes): void => {
    switch (node.type) {
      case "input":
        inputHandler(node);
        break;
      case "output":
        outputHandler(node);
        break;
      default:
        break;
    }
  }

  return {inputHandler, outputHandler, systemVars}
}

