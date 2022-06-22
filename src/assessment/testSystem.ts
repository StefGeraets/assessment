import { InputNode, NodeId, NodeTypes, OutputNode, DelayNode } from "."

const REGEX = /\$[^\s\,\.\!\?\:]+/g;

export const nodeHandler = (nodes: NodeTypes[]) => {
  const systemVars: {[K: string]: string}[] = [];

  const getInputValue = (node: InputNode) => {
    return "userInput";
  }

  const inputHandler = (node: InputNode): void => {
    const inputValue = getInputValue(node)
    systemVars.push({[`$${node.varName}`]: inputValue});
    nextNodeById(node.next);
  }
  
  const outputHandler = (node: OutputNode): void => {
    const parsedString = parseString(node.text);
    printToConsole(parsedString);
    nextNodeById(node.next);
  }

  // const delayHandler = (node: DelayNode): void => {
  //   printToConsole(`${{...node}}`);
  //   nextNodeById(node.next);
  // }

  const parseString = (input: string): string => {
    const regex = REGEX;
    const varMatch: string[] | null = input.match(regex);

    if (varMatch?.length && systemVars?.length) {
      const replaceVar = systemVars.find(obj => obj.hasOwnProperty(varMatch[0]))
      if (replaceVar === undefined) { return input };
      
      const newInput = input.replace(regex, replaceVar[varMatch[0]])
      return newInput;
    }

    return input;
  }

  const printToConsole = (input: string): void => {
    console.log(input);
  }

  const getNodeById = (id: NodeId): NodeTypes | undefined => {
    const existingNode = nodes.find(obj => {return obj.id === id});
    if (existingNode !== undefined) {
      return existingNode;
    }
    return undefined;
  }

  const nextNodeById = (id: NodeId): void => {
    const nextNode = getNodeById(id);
    if (nextNode !== undefined) {
      executeNodeByType(nextNode);
      return
    }
    stop();
    return
  }

  const executeNodeByType = (node: NodeTypes): void => {
    switch (node.type) {
      case "input":
        inputHandler(node);
        break;
      case "output":
        outputHandler(node);
        break;
      // case "delay":
      //   delayHandler(node);
      //   break;
      default:
        stop();
        break;
    }
  }

  const start = () => {
    executeNodeByType(nodes[0]);
  }

  const stop = () => {
    printToConsole("No more steps to take");
  }

  return {inputHandler, outputHandler, start}
}
