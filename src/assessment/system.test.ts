import { nodeHandler } from "./testSystem";

describe("NodeHandler", () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log");
    jest.spyOn(global.Math, 'random').mockReturnValue(0.2);
  })

  afterEach(() => {
    logSpy = jest.spyOn(console, "log").mockRestore();
    jest.spyOn(global.Math, 'random').mockRestore();
  })

  it("should accept array of nodes", () => {
    const newSystem = nodeHandler([
      {
        "id": 1,
        "type": "input",
        "varName": "value1",
        "next": 2,
      },
      {
        "id": 2,
        "type": "output",
        "text": "Some value",
        "next": 3
      }
    ])
    
    newSystem.start();
    
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("Some value");
  });

  it("should handle next node", () => {
    const newSystem = nodeHandler([
      {
        "id": 1,
        "type": "input",
        "varName": "value1",
        "next": 2,
      },
      {
        "id": 2,
        "type": "output",
        "text": "Some value",
        "next": 3
      },
      {
        "id": 3,
        "type": "output",
        "text": "Second value",
        "next": 4
      }
    ])

    newSystem.start();

    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith("Some value");
    expect(logSpy).toHaveBeenCalledWith("Second value");
  });

  it.skip("should handle input nodes correctly", async () => {
    const newSystem = nodeHandler([
      {
        "id": 1,
        "type": "input",
        "varName": "value1",
        "next": 2,
      },
      {
        "id": 2,
        "type": "output",
        "text": "Some value $value1",
        "next": 3
      }
    ])
    
    newSystem.start();
    
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith("Some value userInput");
  });

  it("should print when output node is present", () => {
    const newSystem = nodeHandler([
      {
        "id": 1,
        "type": "output",
        "text": "Print value",
        "next": 2
      },
    ])

    newSystem.start();

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("Print value");
  });
  
  it("should print variable string in output node", () => {
    const newSystem = nodeHandler([
      {
        "id": 1,
        "type": "input",
        "varName": "value1",
        "next": 2,
      },
      {
        "id": 2,
        "type": "input",
        "varName": "value2",
        "next": 3,
      },
      {
        "id": 3,
        "type": "output",
        "text": "Some value here $value1",
        "next": 4
      },
      {
        "id": 4,
        "type": "output",
        "text": "Second value",
        "next": 5
      }
    ])

    newSystem.start();

    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith("Some value here userInput");
    expect(logSpy).toHaveBeenCalledWith("Second value");
  });

  it("should print 'No more steps to take' when all nodes are handled", () => {
    const newSystem = nodeHandler([
      {
        "id": 1,
        "type": "input",
        "varName": "value1",
        "next": 2,
      },
      {
        "id": 2,
        "type": "output",
        "text": "Some value here $value1",
        "next": 3
      }
    ])

    newSystem.start();

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("Some value here userInput");
    expect(logSpy).toHaveBeenCalledWith("No more steps to take");
  });

  it.todo("should wait a set amount of ms with a delayNode");
  it("should choose heads or tails as a next step/node", () => {
    const newSystem = nodeHandler([
      {
        "id": 1,
        "type": "coin",
        "head": 2,
        "tail": 3
      },
      {
        "id": 2,
        "type": "output",
        "text": "You got Heads",
        "next": 4
      },
      {
        "id": 3,
        "type": "output",
        "text": "You got Tails",
        "next": 4
      }
    ])

    newSystem.start();

    expect(logSpy).toHaveBeenCalledTimes(4)
    expect(logSpy).toHaveBeenCalledWith("Do a coin flip");
    expect(logSpy).toHaveBeenCalledWith("We got head!");
    expect(logSpy).toHaveBeenCalledWith("You got Heads");
  });
})