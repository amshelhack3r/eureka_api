//bring in express
const express = require("express");
//get body parser
const bodyParser = require("body-parser");
//template engine
const exphbs = require("express-handlebars");
//import path
const path = require("path");

//bring in the config
const rootpath = require("./config/config").rootpath;

const app = express();

//handle middleware
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      rootpath
    },
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//set the path to the public directory
app.use(express.static(path.join(__dirname, "public")));

// parse application/json
app.use(bodyParser.json());

//require the routes we have created
const routes = require("./routes/crud");
app.use(rootpath, routes);

const port = 8080 | process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
