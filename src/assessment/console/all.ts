import { nodeHandler } from "../system";
import data from "./all.json";
import { NodeTypes } from "..";

const newSystem = nodeHandler(data as NodeTypes[]);
newSystem.start();