import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';
import { initBackgroundFetch } from '../src/utils/backgroundSync';

jest.mock('../src/utils/backgroundSync', () => ({
    initBackgroundFetch: jest.fn(),
}));

jest.mock('../src/navigation/AppNavigation', () => {
    const { Text } = require('react-native');
    return () => <Text>Mocked AppNavigation</Text>;
});

describe('App', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls initBackgroundFetch on mount', () => {
        render(<App />);
        expect(initBackgroundFetch).toHaveBeenCalledTimes(1);
    });

    it('renders AppNavigation', () => {
        const { getByText } = render(<App />);
        expect(getByText('Mocked AppNavigation')).toBeTruthy();
    });
});