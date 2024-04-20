const { create, index, show } = require('../../controllers/v1/accountController');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

afterAll(async () => {
  await prisma.$disconnect();
});

describe('account controller - unit tests', () => {
  test('create account', async () => {
    // Mock request, response, and next function
    const req = { body: { user_id: 1, bank_name: 'Test Bank', bank_account_number: '1234567890', balance: 1000000 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  test('get all accounts', async () => {
    // Mock request, response, and next function
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await index(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test('get account by id', async () => {
    // Mock request, response, and next function
    const req = { params: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await show(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});