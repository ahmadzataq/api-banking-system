const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createTransaction: async (req, res, next) => {
    try {
      const { sender_account_id, receiver_account_id, amount } = req.body;

      // make transaction
      const transaction = await prisma.transaction.create({
        data: {
          amount,
          Source_Bank_Account: { connect: { id: sender_account_id } },
          Destination_Bank_Account: { connect: { id: receiver_account_id } },
        },
      });

      // decreases balance from sender
      await prisma.bank_Account.update({
        where: { id: sender_account_id },
        data: { balance: { decrement: amount } },
      });

      // increases balance to recipient
      await prisma.bank_Account.update({
        where: { id: receiver_account_id },
        data: { balance: { increment: amount } },
      });

      res.status(201).json({
        status: true,
        message: "transaction successfully created",
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllTransactions: async (req, res, next) => {
    try {
      const transactions = await prisma.transaction.findMany();
      res.status(200).json({
        status: true,
        message: "OK",
        data: transactions,
      });
    } catch (error) {
      next(error);
    }
  },

  getTransactionById: async (req, res, next) => {
    try {
      const transactionId = parseInt(req.params.transaction_id);
      const transaction = await prisma.transaction.findUnique({
        where: { id: transactionId },
        include: {
          Source_Bank_Account: { select: { id: true, bank_name: true } },
          Destination_Bank_Account: { select: { id: true, bank_name: true } },
        },
      });

      if (!transaction) {
        return res.status(404).json({
          status: false,
          message: "transaction not found",
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  },
};
