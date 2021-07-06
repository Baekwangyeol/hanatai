const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "hanatai",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "dialectOptions": { charset: "utf8mb4", dateStrings: true, typeCast: true },
    "timezone": '+09:00',
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "hanatai",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "hanatai",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "dialectOptions": { charset: "utf8mb4", dateStrings: true, typeCast: true },
    "timezone": '+09:00',
  }
}
