import { customerService } from '../src/domain/services/customerService';
import { CustomerRepository } from '../src/data/repositories/customerRepository';
import { Customer } from '../src/domain/models/Customer';

jest.mock('../src/data/repositories/customerRepository');

const mockedRepo = CustomerRepository as jest.Mocked<typeof CustomerRepository>;

describe('customerService', () => {
    const mockCustomer: Customer = {
        id: '1',
        name: 'John Doe',
        phone: '1234567890',
        plan: 'Gold',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('getAll should call CustomerRepository.getAll', async () => {
        mockedRepo.getAll.mockResolvedValueOnce([mockCustomer]);

        const result = await customerService.getAll();

        expect(mockedRepo.getAll).toHaveBeenCalled();
        expect(result).toEqual([mockCustomer]);
    });

    it('create should call CustomerRepository.create with correct data', async () => {
        const { id, ...newCustomer } = mockCustomer;
        mockedRepo.create.mockResolvedValueOnce();

        await customerService.create(newCustomer);

        expect(mockedRepo.create).toHaveBeenCalledWith(newCustomer);
    });

    it('update should call CustomerRepository.update with id and data', async () => {
        mockedRepo.update.mockResolvedValueOnce();

        await customerService.update(mockCustomer.id, mockCustomer);

        expect(mockedRepo.update).toHaveBeenCalledWith(mockCustomer.id, mockCustomer);
    });

    it('delete should call CustomerRepository.delete with correct id', async () => {
        mockedRepo.delete.mockResolvedValueOnce();

        await customerService.delete(mockCustomer.id);

        expect(mockedRepo.delete).toHaveBeenCalledWith(mockCustomer.id);
    });

    it('getById should call CustomerRepository.getById and return customer', async () => {
        mockedRepo.getById.mockResolvedValueOnce(mockCustomer);

        const result = await customerService.getById(mockCustomer.id);

        expect(mockedRepo.getById).toHaveBeenCalledWith(mockCustomer.id);
        expect(result).toEqual(mockCustomer);
    });
});