import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { Customer } from '../domain/models/Customer';
import { customerService } from '../domain/services/customerService';

type CustomerListNavigationProp = StackNavigationProp<RootStackParamList, 'CustomerList'>;

const CustomerList = () => {
    const navigation = useNavigation<CustomerListNavigationProp>();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCustomers = useCallback(async () => {
        try {
            setLoading(true);
            const data = await customerService.getAll()
            setCustomers(data);
        } catch (error) {
            console.error("Failed to fetch customers:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchCustomers();
        }, [fetchCustomers])
    );

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            {customers.length > 0 ? <FlatList
                data={customers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <Text style={styles.item} onPress={() => navigation.navigate('CustomerDetail', { customerId: item.id })}>
                    {item.name}
                </Text>
                )}
            /> : 
            <Text style={styles.loader  }>
                {"No results found!"}
            </Text>
            }
            <Button title="Add New Customer" onPress={() => navigation.navigate('AddEditCustomer', {})} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 10 
    },
    loader: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    item: { 
        padding: 15, 
        borderBottomWidth: 1, 
        borderBottomColor: '#ccc', 
        fontSize: 18 
    },
});

export default CustomerList;