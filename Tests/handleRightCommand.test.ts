import { Main } from '../src/Classes/main';
import { TableTop } from '../src/Classes/table-top';
import { Logger } from '../src/logger/logger';

describe('Main Class - handleRightCommand', () => {
    let mainClass: Main;
    let mockTableTop: jest.Mocked<TableTop>;

    beforeEach(() => {
        mainClass = new Main();

        // Create a mocked TableTop instance
        mockTableTop = {
            rotateRight: jest.fn(),
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

    it('should turn the robot right and log success', () => {
        mainClass['handleRightCommand']();

        // Check if the TableTop's turnRight method was called
        expect(mockTableTop.rotateRight).toHaveBeenCalled();

        // Check if the Logger logged success
        expect(Logger.logCommandSuccess).toHaveBeenCalledWith(
            'Robot rotated right successfully',
        );
    });

    it('should log error if the robot is not placed on the table', () => {
        // Simulate robot not being placed
        mainClass['tableTop'] = null;

        mainClass['handleRightCommand']();

        expect(Logger.logCommandError).toHaveBeenCalledWith(
            'Robot not placed on the table.',
        );
    });
});
