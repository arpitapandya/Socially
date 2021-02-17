const express = require('express');
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
// const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const fs = require("fs");
const cors = require("cors");
const dotenv = require('dotenv');
const expressValidator = require('express-validator');
dotenv.config();

// db
// MONGO_URI=mongodb://localhost/nodeapi
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true }).then(() => console.log('DB Connected'));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});

// bring in routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// apiDocs
app.get("/", (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
    if(err) {
      res.status(400).json({
        error: err
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

// middleware
app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(expressValidator());
app.use(cors());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Unauthorized!"});
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});