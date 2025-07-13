import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerDetail from '../screens/CustomerDetail';
import AddEditCustomer from '../screens/AddEditCustomer';
import CustomerList from '../screens/CustomerList';
import { Customer } from '../domain/models/Customer';

export type RootStackParamList = {
    CustomerList: undefined;
    CustomerDetail: { customerId: string };
    AddEditCustomer: { customer?: Customer } | undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CustomerList">
                <Stack.Screen name="CustomerList" component={CustomerList} options={{ title: 'Customers' }} />
                <Stack.Screen name="CustomerDetail" component={CustomerDetail} options={{ title: 'Customer Details' }} />
                <Stack.Screen name="AddEditCustomer" component={AddEditCustomer} options={{ title: 'Add/Edit Customer' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;