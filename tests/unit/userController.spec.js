const { register, index, show } = require('../../controllers/v1/userController');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

afterAll(async () => {
  await prisma.$disconnect();
});

describe('user controller - unit tests', () => {
  test('register user', async () => {
    // Mock request, response, and next function
    const req = { body: { name: 'Bambang', email: 'bambang@mail.com', password: 'bambang123', identity_type: 'KTP', identity_number: '1234567890', address: 'Jalan Haji Aswad' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  test('get all users', async () => {
    // Mock request, response, and next function
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await index(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test('get user by id', async () => {
    // Mock request, response, and next function
    const req = { params: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await show(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});
