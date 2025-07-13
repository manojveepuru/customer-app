import { CustomerRepository } from '../../data/repositories/customerRepository';
import { Customer } from '../models/customer';

export const customerService = {

    getAll: (): Promise<Customer[]> => CustomerRepository.getAll(),

    create: (data: Omit<Customer, 'id'>): Promise<void> => CustomerRepository.create(data),

    update: (id: string, data: Customer): Promise<void> => CustomerRepository.update(id, data),

    delete: (id: string): Promise<void> => CustomerRepository.delete(id),

    getById: (id: string): Promise<Customer> => CustomerRepository.getById(id)
};