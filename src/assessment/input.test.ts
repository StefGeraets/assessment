import { nodeHandler } from "./system"

describe("Input", () => {
  it("should take an input", () => {
    const newSystem = nodeHandler([{id: 1, type: "input", next: 2, varName: "henk"}]);
    newSystem.inputHandler({id: 1, type: "input", next: 2, varName: "henk"});

    expect(newSystem.systemVars[0]["$henk"]).toEqual("standard input");
  })

  it("should save input as given variable", () => {
    const newSystem = nodeHandler([{id: 1, type: "input", next: 2, varName: "testVar" }]);
    expect(newSystem.systemVars).toHaveLength(0);
    newSystem.inputHandler({id: 1, type: "input", next: 2, varName: "testVar" });
    
    expect(newSystem.systemVars).toHaveLength(1);
    expect(newSystem.systemVars).toEqual([{"$testVar": "standard input"}])
  })
})

describe("Output", () => {
  it("should print output", () => {
    console.log = jest.fn();
    const newSystem = nodeHandler([{id: 1, type: "output", next: 2, text: "This should output"}]);
    newSystem.outputHandler({id: 1, type: "output", next: 2, text: "This should output"});

    expect(console.log).toHaveBeenCalledWith("This should output");
  })

  it("should print output and replace string with given variable", () => {
    const newSystem = nodeHandler([{id: 1, type: "input", next: 2, varName: "testVar" }]);
    newSystem.inputHandler({id: 1, type: "input", next: 2, varName: "testVar" });
    newSystem.outputHandler({id: 1, type: "output", next: 2, text: "This should output $testVar"});
    
    expect(console.log).toHaveBeenCalledWith("This should output standard input");
  })
})

export {};
