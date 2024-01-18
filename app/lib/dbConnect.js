"use strict";

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbPool = mysql.createPool({
  // cloud
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  port: process.env.MYSQLPORT,
  database: process.env.MYSQLDATABASE,

  // local
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // port: process.env.DB_PORT,
  // database: process.env.DB_DATABASE,
});

export default dbPool;
