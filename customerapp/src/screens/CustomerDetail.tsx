import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, useFocusEffect, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { Customer } from '../domain/models/Customer';
import { customerService } from '../domain/services/customerService';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'CustomerDetail'>;
type DetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CustomerDetail'>;

const CustomerDetail = () => {
    const navigation = useNavigation<DetailScreenNavigationProp>();
    const route = useRoute<DetailScreenRouteProp>();
    const { customerId } = route.params;
    
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const fetchCustomer = async () => {
                try {
                    setLoading(true);
                    const data = await customerService.getById(customerId);
                    setCustomer(data);
                } catch (error) {
                    console.error("Failed to fetch customer details:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchCustomer();
        }, [customerId])
    );

    const handleDelete = async () => {
        if (!customer) return;
        Alert.alert("Delete Customer", "Are you sure?", 
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            await customerService.delete(customer.id);
                            navigation.goBack();
                        } catch (error) {
                            console.error("Failed to delete customer:", error);
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    if (!customer) {
        return <Text>Customer not found.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Name: {customer.name}</Text>
            <Text style={styles.text}>Phone: {customer.phone}</Text>
            <Text style={styles.text}>Plan: {customer.plan}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => navigation.navigate('AddEditCustomer', { customer })} />
                <Button title="Delete" onPress={handleDelete} color="red" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20 
    },
    loader: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    text: { 
        fontSize: 18, 
        marginBottom: 10 
    },
    buttonContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-around',
        marginTop: 20 
    },
});

export default CustomerDetail;