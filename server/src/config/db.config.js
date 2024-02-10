module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "W3JoYoO36x.B",
  DB: "fs_react_todos",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};