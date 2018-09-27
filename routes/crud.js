/**
 * This file will house the main routes 
 */
//bring in express router
const router = require('express').Router();
//bring in the db connection
const conn = require('../database');

//this is a function for removing single quotes from a string
const rem_quotes = val => {
    return val.replace("/[']+/g", ".")
}

router.get("/", (req, res) => {
    res.send("hello world 1");
});

//getting specific information about a table
router.get("/:table", (req, res) => {
    const sql = `SELECT * from ${req.params.table}`
    conn.query(sql, (err, results, fields) => {
        if (err) {
            return res.status(500).json({
                err
            });
        }
        res.send(results);
    });
});

//getting indepth infomation about a record
router.get("/:table/:criteria/:name", (req, res) => {
    const sql = `SELECT * FROM ${req.params.table} where ${req.params.criteria} = ?`;

    conn.query(sql, [req.params.name], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

//declare your jobs here
//jobs are advanced sql statements which may involve summation, subqueries and left joins
router.get("/:job/:job_number", (req, res) => {
    if ((req.params.job = "job")) {
        res.send("JOB CALLED");
    }
});

/**Now we do some post requests */
router.post("/:table", (req, res) => {
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

router.put("/:table/:column/:id", (req, res) => {
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
router.delete("/:table/:column/:id", (req, res) => {
    const sql = `DELETE from ${req.params.table} WHERE ${req.params.column}='${
    req.params.id
  }'`;

    conn.query(sql, err => {
        if (err) {
            return res.status(404).json({
                err
            });
        }

        return res.status(200).json({
            success: "Entry deleted"
        });
    });
});




module.exports = router;