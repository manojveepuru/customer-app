import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import CustomerDetail from '../src/screens/CustomerDetail';
import { Alert } from 'react-native';
import { NativeModules } from 'react-native';
import { customerService } from '../src/domain/services/customerService';

NativeModules.DevMenu = {};
NativeModules.RNGestureHandlerModule = {};

jest.mock('react-native-gesture-handler', () => ({
    GestureHandlerRootView: ({ children }: any) => children,
}));

jest.spyOn(Alert, 'alert');

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
        useRoute: () => ({ params: { customerId: 'missing-id' } }),
        useFocusEffect: (cb: any) => {
            const React = require('react');
            React.useEffect(cb, []);
        },
    };
});

jest.mock('../src/domain/services/customerService', () => ({
    customerService: {
        getById: jest.fn(),
        delete: jest.fn()
    },
}));


describe('CustomerDetail', () => {

    const mockCustomer = {
        id: '123',
        name: 'Jane Smith',
        phone: '9876543210',
        plan: 'Gold',
    }

    beforeEach(() => {
        jest.clearAllMocks();
        (customerService.getById as jest.Mock).mockResolvedValue(mockCustomer)
    });

    it('renders customer details correctly', async () => {
        const { getByText } = render(
            <NavigationContainer>
                <CustomerDetail />
            </NavigationContainer>
        );
        await waitFor(() => {
            expect(getByText('Name: Jane Smith')).toBeTruthy();
        });
    });


    it('renders fallback text if customer is not found', async () => {
        (customerService.getById as jest.Mock).mockResolvedValue(null)
        const { getByText } = render(
            <NavigationContainer>
                <CustomerDetail />
            </NavigationContainer>
        );
    
        await waitFor(() => {
            expect(getByText('Customer not found.')).toBeTruthy();
        });
    });
});