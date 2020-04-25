const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const userRoute = require("./routes/user.route")
const bookRoute = require("./routes/book.route")
const transactionRoute = require("./routes/transaction.route")
const authRoute = require("./routes/auth.route")
const authMiddleware = require("./middlewares/auth.middleware")


const app = express();


app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(express.static('public'));


app.get("/", (request, response) => {
  response.render("index");
});

app.use('/users', authMiddleware.requireAuth, userRoute)
app.use('/books', authMiddleware.requireAuth, bookRoute)
app.use('/transactions', transactionRoute)
app.use('/auth',authRoute)

// Run server
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
