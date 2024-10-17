## Hey there! Here's a quick run down of the assessment

## About this Project:

This project, written in TypeScript with tests handled by Jest, is designed with a focus on separation of concerns, ensuring each part of the system is responsible for its own distinct functionality. Below is a breakdown of the key components within the src folder:

## Folder Structure
The project is divided into five main parts, each responsible for specific tasks to maintain a clean and modular architecture:

### Main Class: 
Contains the core business logic for manipulating the robot's behavior. It handles the parsing and execution of commands, such as placing the robot on the table and managing its movements.

### TableTop Class: 
Represents the table's structure where the robot operates. It manages the robot's position and direction while ensuring valid moves within the defined grid.

### Command Validator: 
Ensures user inputs are valid, enforcing rules about valid coordinates and directions. This validation ensures the commands align with the expected flow of the program.

### Logger:
Provides a logging mechanism for local observability, enabling users to see real-time feedback on command execution and errors.

### Constants: 
Contains static data used across the application, ensuring consistency in directions, limits, and other fixed parameters.


## How to run the application and tests?

- Ensure `Node.js` is installed on your machine before running this program.
- Clone the project and run `npm install` in the root directory.
- Navigate to the `src/classes` folder and run `npx ts-node main.ts` to trigger the entire flow.
- To run tests, execute `npm run test`.
 

## Assumptions:

- The user must enter `PLACE X,Y,F` as the first command to position the robot. The sequence of X, Y, and F can be in any order, but they must be valid commands - otherwise, an error will be thrown.

- The user can provide any numbers for the X and Y positions. If the numbers are outside the grid boundaries, the robot will be immediately destroyed.

- The user may issue the PLACE command again; however, the behavior is not specified in the requirements. It is assumed that the PLACE command is valid only if the robot is already on the table. If this is the case and the user inputs PLACE without valid coordinates, the robot defaults to position `(0, 0, north)`.

- To prevent the robot from falling off the table, moving the robot outside the grid on either axis will result in its destruction, halting the program.

- The robot cannot move in negative directions. For example, if the robot is facing south and the position is `(2, 0)`, moving the robot would maintain the position `(2, 0, south)`. While theoretically, this could lead to the robot's destruction, this approach has not been implemented.
