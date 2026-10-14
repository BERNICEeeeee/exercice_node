const express = require('express');
const app = express();
const port = 3000;

/*app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/some-html', (req, res) => {
  res.send('<html><body><h1>bonjour html</h1></body></html>');
});

app.get('/some-json', (req, res) => {
  const user = { age: 22, nom: 'Jane' };
  res.json(user);
});

app.get('/transaction', (req, res) => {
  const transactions = [100, 2000, 3000];
  res.json(transactions);
});
app.use(express.json());

app.get('/transaction', (req, res) => {
  console.log('--- HEADERS DE LA REQUÊTE ---');
  console.log(req.headers);

  console.log('--- BODY DE LA REQUÊTE ---');
  console.log(req.body); 

  const transactions = [100, 2000, 3000];
  res.json(transactions);
});
*/
// 1. Route GET /exo-query-string
app.get('/exo-query-string', (req, res) => {
  console.log('req.query :', req.query);

  const age = req.query.age;

  if (age) {
    res.send(`<h1>L'âge de la personne est : ${age} ans</h1>`);
  } else {
    res.send('<h1>Aucun âge fourni dans l\'URL</h1>'); 
  }
});
app.get('/get-user/:userId', (req, res) => {
  const userId = req.params.userId;

  console.log(`ID reçu dans le terminal : ${userId}`);

  res.send(`<h1>ID utilisateur : ${userId}</h1>`);
});
app.listen(port, '127.0.0.1', () => {
  console.log(`Example app listening on http://127.0.0.1:${port}`);
});
