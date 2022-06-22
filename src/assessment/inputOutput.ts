import { nodeHandler } from "./system";
import data from "./inputOutput.json";
import { NodeTypes } from "./index.d";

const newSystem = nodeHandler(data as NodeTypes[]);
newSystem.start();