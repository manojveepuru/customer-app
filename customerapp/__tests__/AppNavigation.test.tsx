jest.mock('react-native-gesture-handler', () => {
    const React = require('react');
  
    return {
        GestureHandlerRootView: ({ children }: { children: React.ReactNode }) => children,
        PanGestureHandler: ({ children }: { children: React.ReactNode }) => children,
        TapGestureHandler: ({ children }: { children: React.ReactNode }) => children,
        State: {},
    
        RNGestureHandlerModule: {
            attachGestureHandler: jest.fn(),
            createGestureHandler: jest.fn(),
            dropGestureHandler: jest.fn(),
            updateGestureHandler: jest.fn(),
        },
    
        Directions: {},
    };
});

import React from 'react';
import { render } from '@testing-library/react-native';
import AppNavigation from '../src/navigation/AppNavigation';

jest.mock('../src/screens/CustomerList', () => {
    const { Text } = require('react-native');
    return () => <Text>Customer List Screen</Text>;
});
  
jest.mock('../src/screens/CustomerDetail', () => {
    const { Text } = require('react-native');
    return () => <Text>Customer Detail Screen</Text>;
});
  
jest.mock('../src/screens/AddEditCustomer', () => {
    const { Text } = require('react-native');
    return () => <Text>Add/Edit Customer Screen</Text>;
});

describe('AppNavigation', () => {
    it('renders the CustomerList screen as initial route', async () => {
        const { getByText } = render(<AppNavigation />);
        expect(getByText('Customer List Screen')).toBeTruthy();
    });
});