const Database = require('better-sqlite3');
const { logTo } = require('../services/log.js');

const db = new Database('localDb.db', {
  verbose: sqlStr => {
    console.log(`${sqlStr}\n`);
    logTo('localDb.log', sqlStr);
      }
    });

const initDb = tableName => {
  const initDbRowQuery = `SELECT count(*)
  FROM sqlite_master
  WHERE type='table'
  AND name='${tableName}'
  `;

  // Check if table exists to determine if db has been initialized
  const table = db.prepare(initDbRowQuery).get();

  // Initialize table according to schema
  if (!table['count(*)']) {
    const schemaQuery = `CREATE TABLE ${tableName} (
      userId TEXT PRIMARY KEY NOT NULL,
      userName TEXT NOT NULL,
      quest1 INTEGER DEFAULT 0,
      quest2 INTEGER DEFAULT 0,
      quest3 INTEGER DEFAULT 0,
      quest4 INTEGER DEFAULT 0,
      quest5 INTEGER DEFAULT 0,
      quest6 INTEGER DEFAULT 0,
      quest7 INTEGER DEFAULT 0,
      quest8 INTEGER DEFAULT 0,
      quest9 INTEGER DEFAULT 0,
      quest10 INTEGER DEFAULT 0)`;

    const indexQuery = `CREATE UNIQUE INDEX userIdIdx 
    ON ${tableName} (userId)
    `;

    db.prepare(schemaQuery).run();
    db.prepare(indexQuery).run();
    db.pragma('synchronous = 1');

    console.log(`Table ${tableName} has been initialized`);
  }
};

module.exports = {
  initDb
};
