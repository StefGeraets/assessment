import { nodeHandler } from "./system"

describe("Input", () => {
  it("should take an input", () => {
    const newSystem = nodeHandler([{id: 1, type: "input", next: 2, varName: "henk"}]);
    newSystem.inputHandler({id: 1, type: "input", next: 2, varName: "henk"}, "dirk");

    expect(newSystem.systemVars[0]["$henk"]).toEqual("dirk");
  })
  
  it("should save input as given variable", () => {
    const newSystem = nodeHandler([{id: 1, type: "input", next: 2, varName: "testVar" }]);
    expect(newSystem.systemVars).toHaveLength(0);
    newSystem.inputHandler({id: 1, type: "input", next: 2, varName: "testVar" }, "value1");
    
    expect(newSystem.systemVars).toHaveLength(1);
    expect(newSystem.systemVars).toEqual([{"$testVar": "value1"}])
  })
})
