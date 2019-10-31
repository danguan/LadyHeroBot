const Database = require('better-sqlite3');
const { logTo } = require('../services/log.js');

const tableName = 'treats';

const db = new Database('localDb.db', {
  verbose: sqlStr => {
    console.log(`${sqlStr}\n`);
    logTo('localDb.log', sqlStr);
      }
    });

function initDb() {
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
      currentTreat INTEGER DEFAULT 0,
      treat1 INTEGER DEFAULT 0,
      treat2 INTEGER DEFAULT 0,
      treat3 INTEGER DEFAULT 0,
      treat4 INTEGER DEFAULT 0,
      treat5 INTEGER DEFAULT 0)`;

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
