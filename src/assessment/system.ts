import { InputNode, NodeId, NodeTypes, OutputNode, DelayNode, CoinNode } from "./index.d"
const readline = require('readline');

const REGEX = /\$[^\s\,\.\!\?\:]+/g;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export const nodeHandler = (nodes: NodeTypes[]) => {
  const systemVars: {[K: string]: string}[] = [];

  const getInputValue = async (node: InputNode): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(`Give input for ${node.varName}: `, (inputValue: string) => {
        resolve(inputValue);
      });
    }); 
  }

  const inputHandler = (node: InputNode): void => {
    const inputValue = getInputValue(node).then(val => {
      systemVars.push({[`$${node.varName}`]: val});
    }).finally(() => {
        nextNodeById(node.next);
      }
    );
  }
  
  const outputHandler = (node: OutputNode): void => {
    const parsedString = parseString(node.text);
    printToConsole(parsedString);
    nextNodeById(node.next);
  }

  const delayHandler = (node: DelayNode): void => {
    printToConsole(`We start a ${node.delay}ms wait`);
    setTimeout(() => {
      nextNodeById(node.next);
    }, node.delay);
  }

  const coinHandler = (node: CoinNode): void => {
    printToConsole("Do a coin flip");
    const result = doCoinFlip();
    printToConsole(`We got ${result}!`);
    nextNodeById(node[result])
  }

  const doCoinFlip = (): "head" | "tail" => {
    const flip = (Math.floor(Math.random() * 2) == 0);
    return flip ? "head" : "tail";
  }

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
      case "delay":
        delayHandler(node);
        break;
      case "coin":
        coinHandler(node);
        break;
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
    rl.close();
  }

  return {inputHandler, outputHandler, getInputValue, start}
}

