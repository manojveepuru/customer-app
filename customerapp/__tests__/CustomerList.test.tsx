import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import CustomerList from '../src/screens/CustomerList';
import { NavigationContainer } from '@react-navigation/native';
import { customerService } from '../src/domain/services/customerService';

jest.mock('react-native-gesture-handler', () => ({
    GestureHandlerRootView: ({ children }: any) => children,
}));

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
;
  
jest.mock('../src/domain/services/customerService', () => ({
    customerService: {
        getAll: jest.fn(),
    },
}));

describe('CustomerList', () => {

    const mockCustomers = [
        { id: '1', name: 'Alice', phone: '123', plan: 'Gold' },
        { id: '2', name: 'Bob', phone: '456', plan: 'Silver' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        (customerService.getAll as jest.Mock).mockResolvedValue(mockCustomers);
    });

    it('renders customer list correctly', async () => {
        const { getByText } = render(
            <NavigationContainer>
                <CustomerList />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(getByText('Alice')).toBeTruthy();
            expect(getByText('Bob')).toBeTruthy();
            expect(getByText('Add New Customer')).toBeTruthy();
        });
    });

    it('renders "No results found!" if list is empty', async () => {
        (customerService.getAll as jest.Mock).mockResolvedValue([]);
        const { getByText } = render(
            <NavigationContainer>
                <CustomerList />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(getByText('No results found!')).toBeTruthy();
        });
    });
});