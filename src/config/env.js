const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

function required(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Environment variable ${name} is required`);
  }
  return value;
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(required("PORT", 3000)),
  db: {
    host: required("DB_HOST", "localhost"),
    port: Number(required("DB_PORT", 5432)),
    user: required("DB_USER", "lab_user"),
    password: required("DB_PASSWORD", "lab_password"),
    database: required("DB_NAME", "game_portal")
  }
};
