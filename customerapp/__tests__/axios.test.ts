import apiClient from '../src/data/api/axios';
import MockAdapter from 'axios-mock-adapter';
import { Alert } from 'react-native';

jest.mock('react-native', () => ({
    Alert: {
        alert: jest.fn(),
    },
    Platform: {
        OS: 'ios',
    },
}));

describe('apiClient interceptors integration', () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(apiClient);
        jest.clearAllMocks();
    });

    afterEach(() => {
        mock.restore();
    });

    it('should send requests and get successful response', async () => {
        mock.onGet('/test').reply(200, { success: true });

        const response = await apiClient.get('/test');
        expect(response.status).toBe(200);
        expect(response.data).toEqual({ success: true });
    });

    it('should trigger alert on response error', async () => {
        mock.onGet('/error').reply(500, { message: 'Internal server error' });

        try {
            await apiClient.get('/error');
        } catch (err) {
            // expected to throw
        }

        expect(Alert.alert).toHaveBeenCalledWith(
            'API Error',
            'An unexpected error occurred. Please try again.'
        );
    });
});