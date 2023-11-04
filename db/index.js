import mysql from "mysql";

const db = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "123456",
  database: "db_admin",
});

function query(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      resolve({err, rows})
    })
  })
}

export default query;
