import { nodeHandler } from "../system";
import data from "./inputOutput.json";
import { NodeTypes } from "..";

const newSystem = nodeHandler(data as NodeTypes[]);
newSystem.start();