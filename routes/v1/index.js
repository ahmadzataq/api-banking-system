const router = require("express").Router();

const userController = require("../../controllers/v1/userController.js");
router.post("/users", userController.register);
router.get("/users", userController.index);
router.get("/users/:id", userController.show);

const accountController = require("../../controllers/v1/accountController.js");
router.post("/accounts", accountController.create);
router.get("/accounts", accountController.index);
router.get("/accounts/:id", accountController.show);

const transactionController = require("../../controllers/v1/transactionController.js");
router.post("/transactions", transactionController.createTransaction);
router.get("/transactions", transactionController.getAllTransactions);
router.get("/transactions/:transaction_id", transactionController.getTransactionById);

module.exports = router;
