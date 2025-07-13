# Project Setup and Usage Guide

## 1. Running JSON-server Locally

### Prerequisites
- Node.js installed (https://nodejs.org/)

### Steps

1.  **Navigate to project root directory in the terminal and run:**
    ```bash
    cd backend
    ```
2.  **Install packages**
    ```bash
    npm install
    ```
3.  **Start JSON-Server**
    ```bash
    npm start
    ```
    You should see output indicating the server is running and the available routes (`http://localhost:3000/customers`)

## 2. Running react native app

### Steps

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

1. **Navigate to project root directory in the terminal and run:**
    ```bash
    cd customerapp
    ```
2. **Install packages**
    ```bash
    npm install
    ```

3. Build and run your app

    open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

    ### Android

    ```sh
    npm run android
    ```

    ### iOS (Make sure pods are installed)
    ```sh
    npm run ios
    ```
    If any issues on ios, delete build folder under ios folder and navigate to ios folder, run "pod install" and go back to customerapp and do "npm run ios"

    If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

    This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## 2. Design Decisions & Future Improvements

### Design Decisions
1. Clean Architecture
    The app is structured according to Clean Architecture principles to ensure separation of concerns, testability, and scalability.

    Data Layer: Responsible for data retrieval and persistence. It includes API calls and repositories to abstract data sources.

    Domain Layer: Contains models, and services.

    Navigation Layer: Uses React Navigation with an AppNavigation, Stack Navigator to handle app navigation and screen flow.

    UI Layer: Contains React Native UI screens.

2. Axios for API Requests
    Used axios interceptor

3. Navigation
    React Navigation is used for flexible and extensible routing, with centralized navigator handling.

4. Background Task Handling
    Background tasks have been implemented to enable features like data syncing or notifications without user interaction.

    Currently minimal, but designed to be extended in future updates for offline sync, periodic fetches, or push notifications.

6. Jest for Testing
    Jest is used as the testing framework for unit and integration tests.

    Tests are written to cover domain logic, data services and UI screens ensuring reliability and facilitating refactoring.

### Future Improvements
1. Validation checks

2. Improved State Management - Introduce global state management (e.g., Redux Toolkit) to better handle complex app-wide states and caching.

3. Use of local storage (AsyncStorage)

4. Enhanced Error Handling - Add centralized error handling including network errors

5. Automated Testing - Expand unit, snapshots and integration tests across all layers using Jest and React Native Testing Library for better reliability.

6. Performance Optimization - Analyze and optimize app performance (e.g., lazy loading screens, reducing bundle size, optimizing images).

7. Effective handling of environment based secrets or variables along with certs and keystores.

8. Add CI/CD pipelines to generate artifacts and deployment.