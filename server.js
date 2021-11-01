const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const invoices = new Map();

const app = express();

app.use(bodyParser.json());

app.get('/invoices', (req, res) => {
  if (invoices.size) {
    return res.send([...invoices.values()]);
  }

  return res.json([]);
});

app.post('/invoice', (req, res) => {
  const invoice = req.body;

  if (!invoice.id) {
    return res.status(400).send('no invoice id provided');
  }

  invoices.set(invoice.id, invoice);

  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
