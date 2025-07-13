import { CustomerRepository } from '../src/data/repositories/customerRepository';
import apiClient from '../src/data/api/axios';
import { Customer } from '../src/domain/models/Customer';

jest.mock('../src/data/api/axios');

const mockedApi = apiClient as jest.Mocked<typeof apiClient>;

describe('CustomerRepository', () => {
    const mockCustomer: Customer = {
        id: '1',
        name: 'Alice',
        phone: '12345677',
        plan: 'Gold',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('getAll: should return a list of customers', async () => {
        mockedApi.get.mockResolvedValueOnce({ data: [mockCustomer] });

        const result = await CustomerRepository.getAll();

        expect(apiClient.get).toHaveBeenCalledWith('/customers');
        expect(result).toEqual([mockCustomer]);
    });

    it('create: should post customer data', async () => {
        mockedApi.post.mockResolvedValueOnce({});

        const { id, ...newCustomer } = mockCustomer;
        await CustomerRepository.create(newCustomer);

        expect(apiClient.post).toHaveBeenCalledWith('/customers', newCustomer);
    });

    it('update: should put updated customer data', async () => {
        mockedApi.put.mockResolvedValueOnce({});

        await CustomerRepository.update(mockCustomer.id, mockCustomer);

        expect(apiClient.put).toHaveBeenCalledWith(`/customers/${mockCustomer.id}`, mockCustomer);
    });

    it('delete: should delete customer by id', async () => {
        mockedApi.delete.mockResolvedValueOnce({});

        await CustomerRepository.delete(mockCustomer.id);

        expect(apiClient.delete).toHaveBeenCalledWith(`/customers/${mockCustomer.id}`);
    });

    it('getById: should return customer by id', async () => {
        mockedApi.get.mockResolvedValueOnce({ data: mockCustomer });

        const result = await CustomerRepository.getById(mockCustomer.id);

        expect(apiClient.get).toHaveBeenCalledWith(`/customers/${mockCustomer.id}`);
        expect(result).toEqual(mockCustomer);
    });
});