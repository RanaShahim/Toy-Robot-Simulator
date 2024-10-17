import { VALID_DIRECTIONS } from "../constants/constants";

export type Directions = (typeof VALID_DIRECTIONS)[number];

export class TableTop {
  private xAxis: number;
  private yAxis: number;
  private startingDirection: Directions;

  constructor(xAxis: number, yAxis: number, startingDirection: Directions) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.startingDirection = startingDirection;
  }

  public getXAxis() {
    return this.xAxis;
  }

  public getYAxis() {
    return this.yAxis;
  }

  public getDirection() {
    return this.startingDirection;
  }

  public getReport() {
    return `${this.xAxis},${
      this.yAxis
    },${this.startingDirection.toUpperCase()}`;
  }

  public rotateLeft() {
    const currentIndex = VALID_DIRECTIONS.indexOf(this.startingDirection);
    const newIndex =
      currentIndex === 0 ? VALID_DIRECTIONS.length - 1 : currentIndex - 1;
    this.startingDirection = VALID_DIRECTIONS[newIndex];
  }

  public rotateRight() {
    const currentIndex = VALID_DIRECTIONS.indexOf(this.startingDirection);
    const newIndex = (currentIndex + 1) % VALID_DIRECTIONS.length;
    this.startingDirection = VALID_DIRECTIONS[newIndex];
  }

  // The function purposely doesn't let the robot move in the negative direction
  public move() {
    switch (this.startingDirection) {
      case "north":
        this.yAxis++;
        break;
      case "east":
        this.xAxis++;
        break;
      case "south":
        if (this.yAxis > 0) this.yAxis--;
        break;
      case "west":
        if (this.xAxis > 0) this.xAxis--;
        break;
    }
  }
}
