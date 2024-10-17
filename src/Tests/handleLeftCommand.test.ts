import { Main } from "../Classes/main";
import { TableTop } from "../Classes/table-top";
import { Logger } from "../logger/logger";

describe("Main Class - handleLeftCommand", () => {
  let mainClass: Main;
  let mockTableTop: jest.Mocked<TableTop>;

  beforeEach(() => {
    mainClass = new Main();

    //Mock TableTop class
    mockTableTop = {
      rotateLeft: jest.fn(),
    } as unknown as jest.Mocked<TableTop>;

    mainClass["tableTop"] = mockTableTop;

    // Mock Logger methods
    jest.spyOn(Logger, "logCommandSuccess").mockImplementation(() => {});
    jest.spyOn(Logger, "logCommandError").mockImplementation(() => {});
  });

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should turn the robot left and log success", () => {
    mainClass["handleLeftCommand"]();

    //Turn left should be called
    expect(mockTableTop.rotateLeft).toHaveBeenCalled();

    // Check if the Logger logged success
    expect(Logger.logCommandSuccess).toHaveBeenCalledWith(
      "Robot rotated left successfully"
    );
  });

  it("should log error if the robot is not placed on the table", () => {
    // Simulate robot not being placed
    mainClass["tableTop"] = null;

    mainClass["handleLeftCommand"]();

    expect(Logger.logCommandError).toHaveBeenCalledWith(
      "Robot not placed on the table."
    );
  });
});
