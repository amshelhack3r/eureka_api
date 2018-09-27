//bring in express
const express = require("express");
//get body parser
const bodyParser = require("body-parser");

const app = express();

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// parse application/json
app.use(bodyParser.json());


//require the routes we have created 
const routes = require('./routes/crud');
app.use('/', routes);


const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));