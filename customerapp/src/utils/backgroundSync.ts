import BackgroundFetch from 'react-native-background-fetch';

export const initBackgroundFetch = async () => {
    const onEvent = async (taskId: string) => {
        try {
            console.log('[BackgroundFetch] Foreground success');
            // Enhance to fetch data and store locally
        } catch (err) {
            console.error('[BackgroundFetch] Foreground sync error:', err);
        } finally {
            BackgroundFetch.finish(taskId);
        }
    };

    const onTimeout = async (taskId: string) => {
        BackgroundFetch.finish(taskId);
    };

    try {
        const status = await BackgroundFetch.configure(
            {
                minimumFetchInterval: 15,
                stopOnTerminate: false,
                startOnBoot: true,
                enableHeadless: true,
            },
            onEvent,
            onTimeout
        );
    } catch (e) {
        console.error('[BackgroundFetch] Configuration error:', e);
    }
};