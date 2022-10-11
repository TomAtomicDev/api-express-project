require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 3000,
  dbUser: process.env.POSTGRES_USER,
  dbPassword: process.env.POSTGRES_PASSWORD,
  dbHost: process.env.POSTGRES_HOST,
  dbName: process.env.POSTGRES_NAME,
  dbPort: process.env.POSTGRES_PORT,
  dbUrl: process.env.DATABASE_URL
};

module.exports = { config };
