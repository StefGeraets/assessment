import { nodeHandler } from "./system";

describe.only("NodeHandler", () => {
  it("should accept array of nodes", () => {
    const logSpy = jest.spyOn(console, "log");
    const newSystem = nodeHandler([
      {
        "id": 1,
        "type": "input",
        "varName": "$value1",
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
    expect(logSpy).toHaveBeenCalledWith("No more steps to take");
  });

  it("should handle next node", () => {
    const logSpy = jest.spyOn(console, "log");
    const newSystem = nodeHandler([
      {
        "id": 1,
        "type": "input",
        "varName": "$value1",
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
    expect(logSpy).toHaveBeenCalledWith("No more steps to take");
  });

  it.todo("should handle input nodes correctly");
  it.todo("should print when output node is present");
  it.todo("should print variable string in output node");
  it.todo("should print 'No more steps to take' when all nodes are handled");
})