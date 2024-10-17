import { CommandValidator } from "../command-validators/command-validator";
import { TableTop, Directions } from "./table-top";
import { Logger } from "../logger/logger";
import readline from "readline";

export class Main {
  private tableTop: TableTop | null = null;
  private commandValidator = new CommandValidator();
  private rl: readline.Interface | undefined;

  public initToyRobot() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.rl.on("line", (input) => this.handleCommand(input.trim()));
    this.rl.on("close", () => {
      Logger.logInfo("Exiting the Toy Robot simulator.");
      process.exit(0);
    });

    Logger.logInfo("Welcome to the Toy Robot simulator! 🤖 Enter commands:");
  }

  //This is main command panel where all the commands are handled
  private handleCommand(command: string) {
    const [action, params] = command.split(" ");
    if (!this.commandValidator.validateMovement(action)) {
      Logger.logCommandError("Invalid command");
      return;
    }

    switch (action.toLowerCase()) {
      case "place":
        this.handlePlaceCommand(params ?? "");
        break;
      case "move":
        this.handleMoveCommand();
        break;
      case "left":
        this.handleLeftCommand();
        break;
      case "right":
        this.handleRightCommand();
        break;
      case "report":
        this.handleReportCommand();
        break;
    }
  }

  handlePlaceCommand(placeCommandArgs: string): void {
    const args = placeCommandArgs.split(",");

    // Identify the direction first
    const directions = ["north", "east", "south", "west"];
    let x: number | undefined;
    let y: number | undefined;
    let direction: Directions | undefined;

    // If the robot is already placed and no new place arguments are provided, reset to 0,0,North
    if (placeCommandArgs.trim() === "" && this.tableTop) {
      this.tableTop = new TableTop(0, 0, "north");
      Logger.logCommandSuccess("ROBOT RESET TO (0,0,NORTH)");
      return;
    }

    /*After the place command, the user is allowed to pass in any VALID commands in any order.

    e.g place north,0,1
    e.g place 0,1,north
    e.g place 1,north,0

    */

    args.forEach((arg) => {
      const lowerArg = arg.toLowerCase();
      if (directions.includes(lowerArg)) {
        direction = lowerArg as Directions;
      } else if (!isNaN(Number(arg))) {
        if (x === undefined) {
          x = Number(arg);
        } else {
          y = Number(arg);
        }
      }
    });

    if (x !== undefined && y !== undefined && direction !== undefined) {
      // Validate the positions and direction
      const isValidPosition = this.commandValidator.isValidPosition(x, y);
      const isValidDirection =
        this.commandValidator.isValidDirection(direction);

      if (isValidPosition && isValidDirection) {
        // If the user puts a value outside the grid range, the robot will be considered destroyed
        const isRobotDestroyed = this.commandValidator.isRobotDestroyed(x, y);
        if (isRobotDestroyed) {
          Logger.logCommandError("ROBOT DESTROYED");
          this.rl?.close();
          return;
        }

        // Place the robot on the table
        this.tableTop = new TableTop(x, y, direction);
        Logger.logCommandSuccess("ROBOT PLACED SUCCESSFULLY");
      } else {
        Logger.logCommandError(
          "INVALID PLACEMENT, PLEASE ENTER VALID X, Y AND DIRECTION"
        );
      }
    } else {
      Logger.logCommandError(
        "INVALID PLACE COMMAND. USAGE: PLACE X,Y,DIRECTION"
      );
    }
  }

  private handleMoveCommand() {
    if (this.tableTop) {
      this.tableTop.move();
      Logger.logCommandSuccess("Robot moved successfully");

      /*Check if the robot is destroyed (went out of the table).

      The robot is only allowed to move within the table boundies (0,0) to (5,5). 
      If the robot moves out of the table, it will be considered destroyed and the program will exit.

      */
      if (
        this.commandValidator.isRobotDestroyed(
          this.tableTop.getXAxis(),
          this.tableTop.getYAxis()
        )
      ) {
        Logger.logCommandError("ROBOT DESTROYED");
        this.rl?.close();
      }
    } else {
      Logger.logCommandError("Robot not placed on the table.");
    }
  }

  handleLeftCommand() {
    if (this.tableTop) {
      this.tableTop.rotateLeft();
      Logger.logCommandSuccess("Robot rotated left successfully");
    } else {
      Logger.logCommandError("Robot not placed on the table.");
    }
  }

  handleRightCommand() {
    if (this.tableTop) {
      this.tableTop.rotateRight();
      Logger.logCommandSuccess("Robot rotated right successfully");
    } else {
      Logger.logCommandError("Robot not placed on the table.");
    }
  }

  handleReportCommand() {
    if (this.tableTop) {
      Logger.logInfo(this.tableTop.getReport());
    } else {
      Logger.logCommandError("Robot not placed on the table.");
    }
  }

  public run() {
    this.initToyRobot();
  }
}

const main = new Main();
main.run();
