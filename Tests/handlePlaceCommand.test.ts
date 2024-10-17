import { Main } from '../src/Classes/main';
import { TableTop } from '../src/Classes/table-top';
import { CommandValidator } from '../src/command-validators/command-validator';
import { Logger } from '../src/logger/logger';

// Mock the Logger class
jest.mock('../src/logger/logger');

describe('MainClass - handlePlaceCommand', () => {
    let mainClass: Main;
    type NewType = CommandValidator;

    let commandValidator: NewType;

    beforeEach(() => {
        // Set up the main class and commandValidator
        commandValidator = new CommandValidator();
        mainClass = new Main();

        // Mock Logger methods
        jest.spyOn(Logger, 'logCommandSuccess').mockImplementation(() => {});
        jest.spyOn(Logger, 'logCommandError').mockImplementation(() => {});

        // Mock commandValidator methods
        jest.spyOn(commandValidator, 'isValidPosition').mockReturnValue(true);
        jest.spyOn(commandValidator, 'isValidDirection').mockReturnValue(true);

        mainClass['commandValidator'] = commandValidator;
    });

    it('should place the robot correctly with valid arguments', () => {
        const placeCommand = 'north,2,3';

        // Call handlePlaceCommand
        mainClass.handlePlaceCommand(placeCommand);

        // Verify Logger logCommandSuccess is called
        expect(Logger.logCommandSuccess).toHaveBeenCalledWith(
            'ROBOT PLACED SUCCESSFULLY',
        );

        // Verify the tableTop object was correctly instantiated
        expect(mainClass['tableTop']).toBeInstanceOf(TableTop);
        if (mainClass['tableTop']) {
            expect(mainClass['tableTop'].getXAxis()).toEqual(2);
            expect(mainClass['tableTop'].getYAxis()).toEqual(3);
            expect(mainClass['tableTop'].getDirection()).toEqual('north');
        } else {
            fail('tableTop is null');
        }
    });

    it('should log an error when invalid place arguments are provided', () => {
        const invalidCommand = 'invalid,-1,6';

        // Mock commandValidator to return false for invalid inputs
        jest.spyOn(commandValidator, 'isValidPosition').mockReturnValue(false);
        jest.spyOn(commandValidator, 'isValidDirection').mockReturnValue(false);

        mainClass.handlePlaceCommand(invalidCommand);

        // Verify Logger logCommandError is called
        expect(Logger.logCommandError).toHaveBeenCalledWith(
            'INVALID PLACE COMMAND. USAGE: PLACE X,Y,DIRECTION',
        );
    });

    it('should reset the robot to 0,0,north if PLACE is entered without valid coordinates', () => {
        // Initialize tableTop to simulate that the robot was already placed
        mainClass['tableTop'] = new TableTop(1, 1, 'east');

        const resetCommand = '';

        mainClass.handlePlaceCommand(resetCommand);

        expect(Logger.logCommandSuccess).toHaveBeenCalledWith(
            'ROBOT RESET TO (0,0,NORTH)',
        );

        // Verify the tableTop object is reset to (0,0,north)
        if (mainClass['tableTop']) {
            expect(mainClass['tableTop'].getXAxis()).toEqual(0);
            expect(mainClass['tableTop'].getYAxis()).toEqual(0);
            expect(mainClass['tableTop'].getDirection()).toEqual('north');
        } else {
            fail('tableTop is null');
        }
    });
});
