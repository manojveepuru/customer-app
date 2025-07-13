import apiClient from '../api/axios';
import { Customer } from '../../domain/models/customer';

export const CustomerRepository = {
    getAll: async (): Promise<Customer[]> => {
        const response = await apiClient.get('/customers');
        return response.data;
    },

    create: async (data: Omit<Customer, 'id'>): Promise<void> => {
        await apiClient.post('/customers', data);
    },

    update: async (id: string, data: Customer): Promise<void> => {
        await apiClient.put(`/customers/${id}`, data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/customers/${id}`);
    },
    
    getById: async (id: string): Promise<Customer> => {
        const response = await apiClient.get(`/customers/${id}`);
        return response.data;
    }
};