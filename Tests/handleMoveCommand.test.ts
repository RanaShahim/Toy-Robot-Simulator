import { Main } from '../src/Classes/main';
import { TableTop } from '../src/Classes/table-top';
import { Logger } from '../src/logger/logger';

describe('Main Class - handleMoveCommand', () => {
    let mainClass: Main;
    let mockTableTop: jest.Mocked<TableTop>;

    beforeEach(() => {
        mainClass = new Main();

        // Create a mocked TableTop instance
        mockTableTop = {
            move: jest.fn(),
            getXAxis: jest.fn().mockReturnValue(1),
            getYAxis: jest.fn().mockReturnValue(1),
        } as unknown as jest.Mocked<TableTop>;

        mainClass['tableTop'] = mockTableTop;

        // Mock Logger methods
        jest.spyOn(Logger, 'logCommandSuccess').mockImplementation(() => {});
        jest.spyOn(Logger, 'logCommandError').mockImplementation(() => {});
    });

    // Clear all mocks after each test
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should move the robot and log success', () => {
        // Call the method
        mainClass['handleMoveCommand']();

        // Check if the TableTop's move method was called
        expect(mockTableTop.move).toHaveBeenCalled();

        // Check if the Logger logged success
        expect(Logger.logCommandSuccess).toHaveBeenCalledWith(
            'Robot moved successfully',
        );
    });

    it('should log error if the robot is destroyed', () => {
        // Mock the commandValidator to simulate robot destruction
        jest.spyOn(
            mainClass['commandValidator'],
            'isRobotDestroyed',
        ).mockReturnValue(true);

        mainClass['handleMoveCommand']();

        // Check if the Logger logged the robot destroyed error
        expect(Logger.logCommandError).toHaveBeenCalledWith('ROBOT DESTROYED');
    });

    it('should log error if the robot is not placed on the table', () => {
        // Simulate robot not being placed
        mainClass['tableTop'] = null;

        mainClass['handleMoveCommand']();

        expect(Logger.logCommandError).toHaveBeenCalledWith(
            'Robot not placed on the table.',
        );
    });
});
