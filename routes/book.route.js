const express = require('express')
const router = express.Router()
const db = require('../db')
const shortId = require('shortid')
const controller = require('../controllers/book.controller')


// Book

router.get("/", controller.indexBook);

// Create books
router.post("/create", controller.createBook);

// Update books

router.get('/:id/update' , controller.getUpdateBook)

router.post('/:id/update' , controller.updatedBook)

// Delete books
router.get('/:id/delete', controller.deleteBook)


module.exports = router;