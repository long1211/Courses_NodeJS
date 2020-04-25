const db = require('../db')
const shortId = require('shortid')
let count = 0
const md5 = require('md5')
const bcrypt = require('bcrypt')
const saltRounds = 10;

// check Admin
// get user
module.exports.indexUser = (req,res) => {
  let isAdmin = db.get("users").value().find(user => user.id === req.cookies.userId).isAdmin;
  let users = db.get("users").value();
  
  if(isAdmin){
    res.render("users/index", {
      users: users.sort(),
      isAdmin
  })
  } else {
    res.render("users/index", {
      users: users.filter(user => user.id === req.cookies.userId),
      isAdmin
  })
  }
}

// create user
module.exports.createUser = async (req,res) => {
  let users = db.get("users").value();
  let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  let newUser = {
    id: shortId.generate(),
    name: req.body.name,
    password : hashedPassword,
    email: req.body.email,
    isAdmin: false
  }
  let checkEmail = users.find(user => user.email === req.body.email)
  if(checkEmail){
    res.render("users/index", {
      users: users,
      errors: ["User have been already exists"],
      values: req.body
    })
    return;
  }

  db.get("users").push(newUser).write();

  res.redirect("/users")
}
// update user

module.exports.getUpdateUser = (req,res) => {
  let user = db.get('users').find({id: req.params.id}).value();
  res.render('users/update', {
    user
  })
}

module.exports.updatedUser = (req,res) => {
  db.get('users').find({id: req.params.id}).assign(req.body).write();
  res.redirect('/users')
}

// delete user
module.exports.deleteUser = (req,res) => {
  db.get("users").remove({id: req.params.id}).write();
  res.redirect("/users")
}

// count cookies
module.exports.countCookie = (req,res,next) => {
  if(req.cookies){
    console.log('cookies: '+ ++count)
  }
  next()
}