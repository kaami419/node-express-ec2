// // localhost
const config = {
  host: "localhost",
  database: "knocker_app",
  username: "root",
  password: "Password_123",
  port: 3306,
};

module.exports = {
  ...config,
  dialect: "mysql",
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    mind: 0,
    acquire: 30000,
    idle: 10000,
  },
};
