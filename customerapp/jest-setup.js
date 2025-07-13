jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter', () => {
    const { EventEmitter } = require('events'); // Node.js EventEmitter
    return EventEmitter;
  });
  
  // For older React Native versions or specific library needs, sometimes this is also needed:
jest.mock('react-native/Libraries/EventEmitter/RCTDeviceEventEmitter', () => {
    const { EventEmitter } = require('events');
    const instance = new EventEmitter();
    return instance;
});
  
jest.mock('react-native-background-fetch', () => ({
    configure: jest.fn(),
    finish: jest.fn(),
    // Add other methods you might use from the library if necessary
}));