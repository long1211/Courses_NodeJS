const db = require('../db')
const shortId = require('shortid')

module.exports.getTransaction = (req, res) => {
  let isAdmin = db.get("users").value().find(user => user.id === req.cookies.userId).isAdmin
  let books = db.get("books").value();
  let users = db.get("users").value();
  let transactions = db.get("transactions").value();

  let changeTrans = transactions.map(trans => {
    let book = books.find(book => book.id === trans.bookId);
    let user = users.find(user => user.id === trans.userId);
    
    return { 
      bookTitle: book.title, 
      userName: user.name,
      userId : user.id,
      id: trans.id,
      isComplete: trans.isComplete  
};
  });

  if(isAdmin){
    res.render("transactions/index", {
      transactions: changeTrans,
      books,
      users : users,
      isAdmin
    });
  } else {
    res.render("transactions/index", {
      transactions: changeTrans.filter(trans => trans.userId === req.cookies.userId),
      books,
      users : users.filter(user => user.id === req.cookies.userId),
      isAdmin
  });
  }
}

module.exports.createTransaction = (req, res) => {
  req.body.id = shortId.generate();

  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("back");
}

module.exports.complete = (req, res) => {
  let id = req.params.id;

  db.get("transactions")
    .find({ id: id })
    .set("isComplete", true)
    .write();

  res.redirect("back");
};