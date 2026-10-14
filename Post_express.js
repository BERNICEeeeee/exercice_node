const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/data', (req, res) => {
  // 3. Affichage dans la console
  console.log('req.body reçu :', req.body);

  res.json(req.body);
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Serveur écho prêt sur http://127.0.0.1:${port}`);
});