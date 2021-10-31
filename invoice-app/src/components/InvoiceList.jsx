import React, { useContext, useEffect } from 'react';
import { observer, MobXProviderContext } from 'mobx-react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DescriptionIcon from '@mui/icons-material/Description';

const InvoiceList = observer(() => {
  const { invoiceStore } = useContext(MobXProviderContext);

  useEffect(() => {
    if (invoiceStore.invoices.size) return;
    invoiceStore.loadInvoices();
  }, [invoiceStore])

  return (
    <React.Fragment>
      <List
        dense
        disablePadding
      >
        { invoiceStore.invoices.size && [...invoiceStore.invoices.values()].map(invoice => (
          <ListItem
            key={invoice.id}
            style={{ maxWidth: '1040px' }}
          >
            <ListItemAvatar>
              <Avatar>
                <DescriptionIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemButton>
              <ListItemText primary={invoice.description} secondary={invoice.total} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  )
});

export default InvoiceList;