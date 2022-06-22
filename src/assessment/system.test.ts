import { nodeHandler } from "./system";

describe.only("NodeHandler", () => {
  it("should accept array of nodes", () => {
    const logSpy = jest.spyOn(console, "log");
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
    const logSpy = jest.spyOn(console, "log");

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

  it.todo("should handle input nodes correctly");

  it("should print when output node is present", () => {
    const logSpy = jest.spyOn(console, "log");
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
    const logSpy = jest.spyOn(console, "log");
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
    expect(logSpy).toHaveBeenCalledWith("Some value here standard input");
    expect(logSpy).toHaveBeenCalledWith("Second value");
  });

  it("should print 'No more steps to take' when all nodes are handled", () => {
    const logSpy = jest.spyOn(console, "log");
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
    expect(logSpy).toHaveBeenCalledWith("Some value here standard input");
    expect(logSpy).toHaveBeenCalledWith("No more steps to take");
  });
})