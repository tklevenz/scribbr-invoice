import React, { useContext, useEffect, useState } from 'react';
import { observer, MobXProviderContext } from 'mobx-react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const InvoiceDetails = observer(({ match }) => {
  const { invoiceStore, customerStore } = useContext(MobXProviderContext);
  const invoiceId = match.params.id;

  useEffect(() => {
    invoiceStore.loadInvoice(invoiceId);
  }, [invoiceStore, invoiceId])

  const [invoice, setInvoice] = useState(invoiceStore.invoices.get(invoiceId));

  const [customerId, setCustomerId] = useState(invoice.customerId);

  useEffect(() => {
    if (!invoiceId) return;
    setInvoice(invoiceStore.invoices.get(invoiceId))
  }, [invoiceId, invoiceStore]);

  const handleCustomerChange = (event) => {
    setCustomerId(event.target.value);
  }

  const handleUpdateInvoice = (field, value) => {
    setInvoice({
      ...invoice,
      [field]: value,
    });

    invoiceStore.updateInvoice(invoiceId, invoice);
  }

  return (
    <React.Fragment>
      <Box
        component="div"
        sx={{
          '& > :not(style)': { m: 1, width: '95%' },
        }}
        autoComplete="off"
        mt={2}
      >
        <TextField size="small" disabled label="Customer Name" value={customerStore.customers.get(customerId).name}></TextField>
        <TextField size="small" disabled label="Customer Address" value={customerStore.customers.get(customerId).city}></TextField>
        <TextField size="small" disabled label="Customer City" value={customerStore.customers.get(customerId).address}></TextField>
        <TextField
          size="small"
          label="Select Customer"
          select
          value={customerId}
          onChange={handleCustomerChange}
          SelectProps={{
            native: true,
          }}
        >
          { customerStore.customers.size && [...customerStore.customers.values()].map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          )) }
        </TextField>

        <TextField
          label="Invoice Number"
          style={{ marginTop: '1rem' }}
          value={invoice.number}
          onChange={(event) => handleUpdateInvoice('number', event.target.value)}
        />

        <TextField
          id=""
          label="Invoice Description"
          style={{ marginTop: '1rem' }}
          value={invoice.description}
          onChange={(event) => handleUpdateInvoice('description', event.target.value)}
        />
      </Box>
    </React.Fragment>
  )
});

export default InvoiceDetails;
