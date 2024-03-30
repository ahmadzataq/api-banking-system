const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  register: async (req, res, next) => {
    try {
      /*  name, email, password, 
            identity_type, identity_number, address */
      let { name, email, password, identity_type, identity_number, address } =
        req.body;

      let exist = await prisma.User.findFirst({ where: { email } });
      if (exist) {
        res.status(400).json({
          status: false,
          message: "email already used",
        });
      }

      let user = await prisma.user.create({
        data: {
          name,
          email,
          password,
          profiles: {
            create: { identity_type, identity_number, address },
          },
        },
        include: { profiles: true },
      });

      res.status(201).json({
        status: true,
        message: "OK",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  index: async (req, res, next) => {
    try {
      let users = await prisma.User.findMany();

      res.status(200).json({
        status: true,
        message: "OK",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      let id = Number(req.params.id);
      let user = await prisma.User.findUnique({ where: { id } });

      if (!user) {
        return res.status(400).json({
          status: false,
          message: "can't find user with id " + id,
          data: id,
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
