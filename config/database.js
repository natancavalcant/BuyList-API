require("dotenv/config")

module.exports = process.env.NODE_ENV == 'test' ? {
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB,
  host: process.env.HOST_DB,
  dialect: process.env.DIALECT_DB,

} : {
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB,
  host: process.env.HOST_DB,
  dialect: process.env.DIALECT_DB,
  dialectOptions: {
    "ssl": { require: true, rejectUnauthorized: false }

  }
}