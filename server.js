const express = require('express');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
const shortid = require('shortid');
db.defaults({ books: [] })
  .write()
const app = express();
const bodyParser = require('body-parser')
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('<a href="/books">books</a>');
});
app.get('/books', (request, response) => {
response.render("index",{
  books:db.get("books").value()
})
  
  
});
app.get('/books/delete/:id', (request, response) => {
  var id=request.params.id;
  var book=db.get("books").find({id:id}).value()
  db.get("books").remove(book).write()
  response.redirect("/books")
})


app.get("/books/update/:id",(request, response) => {
  var id = request.params.id
         db.get('books')
               .find({ id: id })
               .write()
  response.render("books/update", {
    id: id
  })
  })
  

app.post("/books/update",(request, response) => {
  
  var id=request.body.id;
  db.get("books")
        .find({id:id})
        .assign({title: request.body.title})
        .write()
  
  response.redirect("/books")
})
       

app.post("/books/create",(request, response) => {
  request.body.id=shortid.generate();
  db.get("books").push(request.body).write();
  response.redirect("/books");
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
