require("dotenv/config")

module.exports = {
  "test": {
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_URL,
    port: process.env.PORT_DB,
    dialect: process.env.DIALECT_DB,
  },
  "production": {
    "use_env_variable": "DATABASE_URL"
  },
  "development": {
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_URL,
    port: process.env.PORT_DB,
    dialect: process.env.DIALECT_DB,
  }
}