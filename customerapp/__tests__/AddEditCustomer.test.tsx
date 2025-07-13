import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AddEditCustomer from '../src/screens/AddEditCustomer';
import { customerService } from '../src/domain/services/customerService';
import { NativeModules } from 'react-native';

NativeModules.DevMenu = {};
NativeModules.RNGestureHandlerModule = {};

jest.mock('react-native-gesture-handler', () => {
    return {
        GestureHandlerRootView: ({ children }: any) => children,
    };
});

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            goBack: jest.fn(),
        }),
        useRoute: () => ({
            params: {
                customer: undefined,
            },
        }),
    };
});

jest.mock('../src/domain/services/customerService', () => ({
    customerService: {
        create: jest.fn(() => Promise.resolve()),
        update: jest.fn(() => Promise.resolve()),
    },
}));

describe('AddEditCustomer', () => {

    const mockCustomer = {
        id: '123',
        name: 'Jane',
        phone: '9876543210',
        plan: 'Gold',
    }

    beforeEach(() => {
        jest.clearAllMocks();
        (customerService.create as jest.Mock).mockResolvedValue(mockCustomer)
    });

    it('renders inputs and button', () => {
        const { getByPlaceholderText, getByText } = render(
            <NavigationContainer>
                <AddEditCustomer />
            </NavigationContainer>
        );

        expect(getByPlaceholderText('Name')).toBeTruthy();
        expect(getByPlaceholderText('Phone')).toBeTruthy();
        expect(getByPlaceholderText('Plan')).toBeTruthy();
        expect(getByText('Save Customer')).toBeTruthy();
    });

    it('calls create on customerService for new customer', async () => {
        const createMock = customerService.create as jest.Mock;
        const { getByPlaceholderText, getByText } = render(
            <NavigationContainer>
                <AddEditCustomer />
            </NavigationContainer>
        );

        fireEvent.changeText(getByPlaceholderText('Name'), 'Jane');
        fireEvent.changeText(getByPlaceholderText('Phone'), '9876543210');
        fireEvent.changeText(getByPlaceholderText('Plan'), 'Gold');

        fireEvent.press(getByText('Save Customer'));

        await waitFor(() => {
            expect(customerService.create as jest.Mock).toHaveBeenCalledWith({
                name: 'Jane',
                phone: '9876543210',
                plan: 'Gold',
            });
        });
    });

    it('calls update on customerService for existing customer', async () => {
        jest.spyOn(require('@react-navigation/native'), 'useRoute').mockReturnValue({
            params: {
                customer: {
                    id: '1',
                    name: 'Jane Doe',
                    phone: '9876543210',
                    plan: 'Basic',
                },
            },
        });

        const { getByPlaceholderText, getByText } = render(
            <NavigationContainer>
                <AddEditCustomer />
            </NavigationContainer>
        );

        fireEvent.changeText(getByPlaceholderText('Name'), 'Jane Smith');
        fireEvent.press(getByText('Save Customer'));

        await waitFor(() => {
            expect(customerService.update as jest.Mock).toHaveBeenCalledWith('1', {
                id: '1',
                name: 'Jane Smith',
                phone: '9876543210',
                plan: 'Basic',
            });
        });
    });
});