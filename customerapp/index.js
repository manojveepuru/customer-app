import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import BackgroundFetch from 'react-native-background-fetch';

const MyBackgroundSyncTask = async (event) => {
    const taskId = typeof event === 'string' ? event : event.taskId;
    try {
        console.log('[BackgroundFetch] Headless sync success');
        // Enhance to fetch data and store locally
    } catch (e) {
        console.error('[BackgroundFetch] Headless sync failed:', e);
    } finally {
        BackgroundFetch.finish(taskId);
    }
};

BackgroundFetch.registerHeadlessTask(MyBackgroundSyncTask);

AppRegistry.registerComponent(appName, () => App);
