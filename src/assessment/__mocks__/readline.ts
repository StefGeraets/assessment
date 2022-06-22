const readline = {
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn().mockImplementationOnce((_questionTest, cb) => cb("user input")),
    close: jest.fn().mockImplementationOnce(() => undefined)
  })
};

export default readline;