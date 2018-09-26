//bring in express
const express = require("express");
//bring in mysql
const mysql = require("mysql");
//get the config file
const config = require("./config/config");
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

//create a mysql connection
const conn = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DBNAME
});

conn.connect(err => {
  if (err) {
    console.log(`Connection error ${err.stack}`);
    return;
  }
  console.log(`Connected as id ${conn.threadId}`);
});

const port = 3000;
app.get("/", (req, res) => {
  res.send("hello world 1");
});

//getting specific information about a table
app.get("/:table", (req, res) => {
  const sql = `SELECT * from ${req.params.table}`;
  conn.query(sql, (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

//getting indepth infomation about a record
app.get("/:table/:criteria/:name", (req, res) => {
  const sql = `SELECT * FROM ${req.params.table} where ${
    req.params.criteria
  } = ?`;
  //remove single quotes from the req.params table name
  conn.query(sql, [req.params.name], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

//declare your jobs here
//jobs are advanced sql statements which may involve summation, subqueries and left joins
app.get("/:job/:job_number", (req, res) => {
  if ((req.params.job = "job")) {
    res.send("JOB CALLED");
  }
});

/**Now we do some post requests */
app.post("/:table", (req, res) => {
  let val = Object.values(req.body);

  //append quotational marks on the values
  let arr = val.map(value => `"${value}"`).join(",");
  const sql = `INSERT INTO ${req.params.table}(${Object.keys(
    req.body
  )}) VALUES (${arr})`;

  conn.query(sql, err => {
    if (err) {
      return res.status(409).json({
        err
      });
    }
    return res.status(200).json({
      success: "Record inserted"
    });
  });
});

app.put("/:table/:column/:id", (req, res) => {
  let arr = new Array();
  for (const key of Object.keys(req.body)) {
    arr.push(`${key}='${req.body[key]}'`);
  }
  const sql = `UPDATE ${req.params.table} SET ${arr} where ${
    req.params.column
  } = '${req.params.id}'`;

  conn.query(sql, err => {
    if (err) {
      return res.status(304).json({
        err
      });
    }
    return res.status(200).json({
      success: "Record updated"
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
