const request = require('supertest');
const app = require('../../app');

describe('testing user endpoints', () => {
    let createdUserId;

    test('register user', async () => {
        try {
            const newUser = {
                name: 'User 1',
                email: 'user1@mail.com',
                password: 'password123',
                identity_type: 'KTP',
                identity_number: '1237894560',
                address: 'Gang Nangka'
            };

            const response = await request(app)
                .post('/v1/users')
                .send(newUser);

            expect(response.status).toBe(201);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe('OK');
            expect(response.body.data.name).toBe(newUser.name);

            // Save the created user ID for future tests
            createdUserId = response.body.data.id;
        } catch (err) {
            expect(err).toBe('failed to register user');
        }
    });

    test('get all users', async () => {
        try {
            const response = await request(app)
                .get('/v1/users');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe('OK');
            expect(Array.isArray(response.body.data)).toBe(true);
        } catch (err) {
            expect(err).toBe('failed to retrieve all users');
        }
    });

    test('get user by id', async () => {
        try {
            const response = await request(app)
                .get(`/v1/users/${createdUserId}`);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe('OK');
            expect(response.body.data.id).toBe(createdUserId);
        } catch (err) {
            expect(err).toBe('failed to retrieve user by ID');
        }
    });
});
