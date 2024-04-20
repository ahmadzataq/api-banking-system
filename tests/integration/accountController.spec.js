const request = require('supertest');
const app = require('../../app');

describe('testing account endpoints', () => {
    let createdAccountId;

    test('create account', async () => {
        try {
            const newAccountData = {
                user_id: 2,
                bank_name: 'Bank DEF',
                bank_account_number: '0987654321',
                balance: 1500000
            };

            const response = await request(app)
                .post('/v1/accounts')
                .send(newAccountData);

            expect(response.status).toBe(201);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe('account successfully created');
            expect(response.body.data.bank_name).toBe(newAccountData.bank_name);

            createdAccountId = response.body.data.id;
        } catch (err) {
            expect(err).toBe('failed to create account');
        }
    });

    test('get all accounts', async () => {
        try {
            const response = await request(app)
                .get('/v1/accounts');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe('OK');
            expect(Array.isArray(response.body.data)).toBe(true);
        } catch (err) {
            expect(err).toBe('failed to get all accounts');
        }
    });

    test('get account by id', async () => {
        try {
            const response = await request(app)
                .get(`/v1/accounts/${createdAccountId}`);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe('OK');
            expect(response.body.data.id).toBe(createdAccountId);
        } catch (err) {
            expect(err).toBe('failed to get account by id');
        }
    });
});
