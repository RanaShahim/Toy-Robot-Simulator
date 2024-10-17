import {
  MAX_X_AXIS,
  MAX_Y_AXIS,
  MIN_X_AXIS,
  MIN_Y_AXIS,
  VALID_DIRECTIONS,
} from "../constants/constants";

export class CommandValidator {
  public isValidPosition(x: number, y: number): boolean {
    return x >= MIN_X_AXIS && y >= MIN_Y_AXIS;
  }

  public isValidDirection(direction: string): boolean {
    return VALID_DIRECTIONS.includes(direction.toLowerCase() as any);
  }

  public validateMovement(command: string): boolean {
    const validCommands = ["place", "move", "left", "right", "report"];
    return validCommands.includes(command.toLowerCase());
  }

  public isRobotDestroyed(x: number, y: number): boolean {
    return x > MAX_X_AXIS || y > MAX_Y_AXIS;
  }
}
