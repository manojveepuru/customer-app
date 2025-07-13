import BackgroundFetch from 'react-native-background-fetch';
import { initBackgroundFetch } from '../src/utils/backgroundSync';

jest.mock('react-native-background-fetch', () => ({
    configure: jest.fn(),
    finish: jest.fn(),
}));

describe('initBackgroundFetch', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should configure BackgroundFetch successfully', async () => {
        const mockConfigure = BackgroundFetch.configure as jest.Mock;
        mockConfigure.mockResolvedValueOnce('mock-status');

        await initBackgroundFetch();

        expect(mockConfigure).toHaveBeenCalledWith(
        {
            minimumFetchInterval: 15,
            stopOnTerminate: false,
            startOnBoot: true,
            enableHeadless: true,
        },
        expect.any(Function),
        expect.any(Function)
        );
    });

    it('should log configuration error if thrown', async () => {
        const error = new Error('Config failed');
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        (BackgroundFetch.configure as jest.Mock).mockRejectedValueOnce(error);

        await initBackgroundFetch();

        expect(consoleSpy).toHaveBeenCalledWith('[BackgroundFetch] Configuration error:', error);
        consoleSpy.mockRestore();
    });

    it('should handle onEvent and call finish', async () => {
        const mockConfigure = BackgroundFetch.configure as jest.Mock;
        let onEvent: (taskId: string) => Promise<void> = async () => {};
        let onTimeout: (taskId: string) => Promise<void> = async () => {};

        mockConfigure.mockImplementationOnce((_config, event, timeout) => {
        onEvent = event;
        onTimeout = timeout;
        return Promise.resolve('mock-status');
        });

        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
        await initBackgroundFetch();

        await onEvent('test-task-id');

        expect(mockConsoleLog).toHaveBeenCalledWith('[BackgroundFetch] Foreground success');
        expect(BackgroundFetch.finish).toHaveBeenCalledWith('test-task-id');
        mockConsoleLog.mockRestore();
    });

    it('should handle onEvent error and call finish', async () => {
        const mockConfigure = BackgroundFetch.configure as jest.Mock;
        let onEvent: (taskId: string) => Promise<void> = async () => {};
        mockConfigure.mockImplementationOnce((_config, event, _timeout) => {
        onEvent = event;
        return Promise.resolve('mock-status');
        });

        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        await initBackgroundFetch();

        // simulate error inside onEvent
        const originalLog = console.log;
        console.log = () => {
        throw new Error('Simulated error');
        };

        await onEvent('error-task-id');

        expect(mockConsoleError).toHaveBeenCalledWith('[BackgroundFetch] Foreground sync error:', expect.any(Error));
        expect(BackgroundFetch.finish).toHaveBeenCalledWith('error-task-id');

        console.log = originalLog;
        mockConsoleError.mockRestore();
    });

    it('should handle onTimeout and call finish', async () => {
        const mockConfigure = BackgroundFetch.configure as jest.Mock;
        let onTimeout: (taskId: string) => Promise<void> = async () => {};
        mockConfigure.mockImplementationOnce((_config, _event, timeout) => {
        onTimeout = timeout;
        return Promise.resolve('mock-status');
        });

        await initBackgroundFetch();
        await onTimeout('timeout-task-id');

        expect(BackgroundFetch.finish).toHaveBeenCalledWith('timeout-task-id');
    });
});
