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
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  smtp: {
    user: process.env.NODE_MAILER_USER,
    password: process.env.NODE_MAILER_PASS,
    host: process.env.NODE_MAILER_HOST,
    port: process.env.NODE_MAILER_PORT
  }
  
};

module.exports = { config };
