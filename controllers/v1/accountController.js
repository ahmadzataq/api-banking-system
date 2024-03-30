const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res, next) => {
    try {
      let { user_id, bank_name, bank_account_number, balance } = req.body;

      let user = await prisma.User.findUnique({ where: { id: user_id } });

      if (!user) {
        return res.status(400).json({
          status: false,
          message: "user not found",
        });
      }

      let account = await prisma.Bank_Account.create({
        data: {
          bank_name,
          bank_account_number,
          balance,
          User: {
            connect: { id: user_id },
          },
        },
      });

      res.status(201).json({
        status: true,
        message: "account successfully created",
        data: account,
      });
    } catch (error) {
      next(error);
    }
  },

  index: async (req, res, next) => {
    try {
      let accounts = await prisma.Bank_Account.findMany();

      res.status(200).json({
        status: true,
        message: "OK",
        data: accounts,
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      let id = Number(req.params.id);
      let account = await prisma.Bank_Account.findUnique({
        where: { id: id },
      });

      if (!account) {
        return res.status(400).json({
          status: false,
          message: "account not found",
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: account,
      });
    } catch (error) {
      next(error);
    }
  },
};
