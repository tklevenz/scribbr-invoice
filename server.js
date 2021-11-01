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

app.post('/email_invoice/:id', (req, res) => {
  const id = req.params.id;
  const invoice = invoices.get(id);
  const { email } = req.body;

  if (!invoice) {
    return res.status(400).send(`Invoice with id: ${id} not found`);
  }

  if (!email) {
    return res.status(400).send('No email provided');
  }

  console.log(email, invoice);

  // format invoice and send using mailgun or nodemailer
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
