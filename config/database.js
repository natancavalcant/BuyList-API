require("dotenv/config")

module.exports = {
  dialect: "postgres",
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB,
  host: process.env.DATABASE_URL,
  port: process.env.PORT_DB,
}