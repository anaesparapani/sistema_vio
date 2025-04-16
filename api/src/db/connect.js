const mysql = require("mysql2"); //Importa o mysql

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "10.89.240.91",
  user: "alunods",
  password: "senai@604",
  database: "vio_ana",
});

module.exports = pool; //Para usar o mysql
