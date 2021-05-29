const env = require("./environment");
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${env.dbName}:${env.dbPass}@cluster0.s0lia.mongodb.net/coviDb?retryWrites=true&w=majority`
);
const db = mongoose.connection;
db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
