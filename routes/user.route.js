const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller')
const validate = require('../validate/user.validate')


// User

router.get("/", controller.countCookie, controller.indexUser)

// Create User

router.post("/create" , validate.postCreate,controller.countCookie, controller.createUser)

// Update User

router.get('/:id/update',controller.countCookie, controller.getUpdateUser)

router.post('/:id/update',controller.countCookie, controller.updatedUser)

//  Delete user

router.get("/:id/delete",controller.countCookie, controller.deleteUser)

// test cookie

router.get("/cookie", (req,res,next) => {
  res.cookie('user-id', 12345)
  res.send('Hello')
})


module.exports = router;