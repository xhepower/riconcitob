require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  apiKey: process.env.API_KEY,
  jwtSecretRecovery: process.env.JWT_SECRET_RECOVERY,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD,
  myFrontend: process.env.MY_FRONTEND,
};

module.exports = { config };
