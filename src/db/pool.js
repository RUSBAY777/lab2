const { Pool } = require("pg");

/**
 * По умолчанию у pg нет короткого таймаута на установку соединения — при выключенной БД
 * запросы могут «висеть», и страница в браузере не открывается.
 */
function createDbPool(config) {
  return new Pool({
    ...config,
    max: Number(process.env.DB_POOL_MAX || 10),
    connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT_MS || 5000),
    idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS || 30000)
  });
}

module.exports = { createDbPool };
