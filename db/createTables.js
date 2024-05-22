const db = require('.');

const createUserTable = async () => {
  const deleteStatement = db.prepare(`
      DROP TABLE IF EXISTS users
    `);
  deleteStatement.run();
  const statement = db.prepare(`
    CREATE TABLE users (
        user_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        country TEXT
    )
    `);
  statement.run();
};

const createNotesTable = async () => {
  const deleteStatement = db.prepare(`
    DROP TABLE IF EXISTS notes
  `);
  deleteStatement.run();
  console.log(1);
  const statement = db.prepare(`
  CREATE TABLE notes (
    note_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
  )
  `);

  statement.run();
};

const createTable = async () => {
  console.log('creando tablas...');
  await createUserTable();
  console.log('tablas del usuario creada');
  await createNotesTable();
  console.log('tablas de notas creadas');
  console.log('tablas creadas!');
};

createTable();
