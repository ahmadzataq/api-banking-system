const { createTransaction, getAllTransactions, getTransactionById } = require('../../controllers/v1/transactionController');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

afterAll(async () => {
  await prisma.$disconnect();
});

describe('transaction controller - unit tests', () => {
  test('create transaction', async () => {
    // Mock request, response, and next function
    const req = { body: { sender_account_id: 1, receiver_account_id: 2, amount: 5000000 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await createTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  test('get all transactions', async () => {
    // Mock request, response, and next function
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await getAllTransactions(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test('get transaction by id', async () => {
    // Mock request, response, and next function
    const req = { params: { transaction_id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await getTransactionById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});
