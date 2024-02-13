const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql2");
const connection = mysql.createConnection(config);
const sql1 = `use nodedb`;
connection.query(sql1);

const sql2 = `create table if not exists people(id int not null auto_increment, name varchar(255), primary key(id));`;
connection.query(sql2);

const sql3 = `INSERT INTO people(name) values ('San')`;
connection.query(sql3);

connection.end();

app.get("/api", (req, res) => {
  const connection = mysql.createConnection(config);

  connection.execute("SELECT * FROM people", (err, results, fields) => {
    console.log(results);

    res.send(`<h1>Full Cycle Rocks!</h1>
      <ul>
        ${results.map((result) => `<li>${result.name}</li>`)}
      </ul>
    `);
  });

  connection.end();
});

app.listen(port, () => console.log(`running on port: ${port}`));
