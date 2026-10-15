import { Client } from 'pg';

const DB_USER = process.env.dbuser || 'postgres';
const DB_PWD = process.env.dbpwd || '';
const DB_NAME = 'mabase';

function getConnection(): Client {
  return new Client({
    host: 'localhost',
    port: 5432,
    user: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
  });
}

function getUsers(callback: (err: Error | null, rows?: any[]) => void): void {
  const client = getConnection();

  client.connect((err: Error | null) => {
    if (err) {
      console.error('Erreur de connexion avec env vars :', err);
      return callback(err);
    }

    client.query('SELECT * FROM users', (queryErr: Error | null, result) => {
      client.end();

      if (queryErr) {
        return callback(queryErr);
      }

      callback(null, result.rows);
    });
  });
}

getUsers((err, users) => {
  if (err) {
    console.error('Erreur :', err);
    return;
  }
  console.log('Utilisateurs récupérés :', users);
});