const express = require('express')
const router = express.Router();
const controller = require('../controllers/transaction.controller')


// Transactions

router.get("/", controller.getTransaction);

// Create Transactions
router.post("/", controller.createTransaction);

// isComplete

router.get("/:id/complete", controller.complete)

module.exports = router;