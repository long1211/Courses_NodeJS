const db = require('../db')
const shortId = require('shortid')

module.exports.indexBook = (req, res) => {
  let isAdmin = db.get("users").value().find(user => user.id === req.cookies.userId).isAdmin;
  res.render("books/index", {
    books: db.get("books").value(),
    isAdmin
  });
}

module.exports.createBook = (req, res) => {
  req.body.id = shortId.generate();
  console.log(req.body)
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("back");
}

module.exports.getUpdateBook = (req,res) => {
  let book = db.get('books').find({id: req.params.id}).value();
  res.render('books/update', {
    book
  })
}

module.exports.updatedBook = (req,res) => {
  db.get('books').find({ id: req.params.id }).assign(req.body).write();
  res.redirect('/books')
}

module.exports.deleteBook = (req,res) => {
  db.get('books').remove({id : req.params.id}).write()
  res.redirect('/books')
}
