import React, { useContext, useEffect, useState } from 'react';
import { observer, MobXProviderContext } from 'mobx-react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import InvoiceLineItem from './InvoiceLineItem';
import { v4 as uuid } from 'uuid';

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
  }

  const handleUpdateLineItem = (updatedItem) => {
    setInvoice({
      ...invoice,
      lineItems: invoice.lineItems.map((item) => {
        if (item.id === updatedItem.id) {
          return updatedItem;
        }

        return item;
      }),
    });
  }

  const addLineItem = () => {
    setInvoice({
      ...invoice,
      lineItems: [
        ...invoice.lineItems,
        {
          id: uuid(),
          description: '',
          hours: '',
          rate: '',
        }
      ],
    });

    updateStore();
  }

  const updateStore = () => invoiceStore.updateInvoice(invoiceId, invoice);

  return (
    <React.Fragment>
      <Box
        component="div"
        sx={{
          '& > :not(style)': { m: 1, width: '95%' },
        }}
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
          onBlur={updateStore}
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
          onBlur={updateStore}
        />

        <TextField
          id=""
          label="Invoice Description"
          style={{ marginTop: '1rem' }}
          value={invoice.description}
          onChange={(event) => handleUpdateInvoice('description', event.target.value)}
          onBlur={updateStore}
        />

        <TextField
          label="Select Customer"
          select
          value={invoice.status}
          onChange={(event) => handleUpdateInvoice('status', event.target.value)}
          onBlur={updateStore}
          SelectProps={{
            native: true,
          }}
        >
          <option value="open">open</option>
          <option value="sent">sent</option>
          <option value="paid">paid</option>
          <option value="late">late</option>
        </TextField>

        <List
          dense
          disablePadding
          style={{
            border: '1px solid rgba(0, 0, 0, 0.38)',
            borderRadius: '3px',
          }}
        >
          {invoice.lineItems.map(item => (
            <InvoiceLineItem key={item.id} item={item} onChange={handleUpdateLineItem} />
          ))}
        </List>
      </Box>

      <Fab
        variant="extended"
        color="primary"
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
        }}
        onClick={addLineItem}
      >
        <AddIcon sx={{ mr: 1 }} />
        New line item
      </Fab>
    </React.Fragment>
  )
});

export default InvoiceDetails;
