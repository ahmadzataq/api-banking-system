const request = require('supertest');
const app = require('../../app');

describe('testing transaction endpoints', () => {
    let createdTransactionId;

    test('create transaction', async () => {
        try {
            const newTransactionData = {
                sender_account_id: 2,
                receiver_account_id: 1,
                amount: 500000
            };

            const response = await request(app)
                .post('/v1/transactions')
                .send(newTransactionData);

            expect(response.status).toBe(201);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe('transaction successfully created');
            expect(response.body.data.amount).toBe(newTransactionData.amount);

            // Save the created transaction ID for future tests
            createdTransactionId = response.body.data.id;
        } catch (err) {
            expect(err).toBe('failed to create transaction');
        }
    });

    test('get all transactions', async () => {
        try {
            const response = await request(app)
                .get('/v1/transactions');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe('OK');
            expect(Array.isArray(response.body.data)).toBe(true);
        } catch (err) {
            expect(err).toBe('failed to retrieve all transactions');
        }
    });

    test('get transaction by id', async () => {
        try {
            const response = await request(app)
                .get(`/v1/transactions/${createdTransactionId}`);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe('OK');
            expect(response.body.data.id).toBe(createdTransactionId);
        } catch (err) {
            expect(err).toBe('failed to retrieve transaction by ID');
        }
    });
});
