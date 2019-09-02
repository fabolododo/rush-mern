//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');

//Connexion à la base de donnée
let mongoDB =  process.env.MONGODB_URI || "mongodb://localhost:27042/rush-mern";

mongoose.connect(
  mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var allowedOrigins = ['http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {

    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin)
      return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  }
}));



//Définition du routeur
const router = express.Router();
app.use("/users", router);
require(__dirname + "/routes/user.route")(router);


//Définition et mise en place du port d'écoute
const port = 4242;
module.exports = app.listen(port, () => console.log(`Listening on port ${port}`));