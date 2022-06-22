import { nodeHandler } from "../system";
import data from "./inputOutputDelay.json";
import { NodeTypes } from "..";

const newSystem = nodeHandler(data as NodeTypes[]);
newSystem.start();