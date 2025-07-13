import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigation';
import { customerService } from '../domain/services/customerService';

type AddEditScreenRouteProp = RouteProp<RootStackParamList, 'AddEditCustomer'>;

const AddEditCustomer = () => {
    const navigation = useNavigation();
    const route = useRoute<AddEditScreenRouteProp>();
    const existingCustomer = route.params?.customer;

    const [name, setName] = useState(existingCustomer?.name || '');
    const [phone, setPhone] = useState(existingCustomer?.phone || '');
    const [plan, setPlan] = useState(existingCustomer?.plan || '');

    const handleSave = async () => {
        if (!name || !phone || !plan) {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        try {
            if (existingCustomer) {
                await customerService.update(existingCustomer.id, { ...existingCustomer, name, phone, plan });
            } else {
                await customerService.create({ name, phone, plan });
            }
            navigation.goBack();
        } catch (error) {
            console.error("Failed:", error);
        }
    };

    return (
        <View style={addEditStyles.container}>
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={addEditStyles.input} />
            <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={addEditStyles.input} keyboardType="phone-pad" />
            <TextInput placeholder="Plan" value={plan} onChangeText={setPlan} style={addEditStyles.input} />
            <Button title="Save Customer" onPress={handleSave} />
        </View>
    );
};

const addEditStyles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20 
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default AddEditCustomer;