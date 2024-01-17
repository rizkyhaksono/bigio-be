"use strict";

import mysql from "mysql2/promise";

const dbPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3307,
  database: "bigio",
});

export default dbPool;
