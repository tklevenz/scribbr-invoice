import React, { useContext, useEffect } from 'react';
import { observer, MobXProviderContext } from 'mobx-react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DescriptionIcon from '@mui/icons-material/Description';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';

const InvoiceList = observer(() => {
  const { invoiceStore } = useContext(MobXProviderContext);
  const history = useHistory();

  useEffect(() => {
    if (invoiceStore.invoices.size) return;
    invoiceStore.loadInvoices();
  }, [invoiceStore])

  return (
    <React.Fragment>
      <List
        dense
        disablePadding
        style={{ width: '100%' }}
      >
        { invoiceStore.invoices.size ? [...invoiceStore.invoices.values()].map(invoice => (
          <ListItem
            key={invoice.id}
          >
            <ListItemAvatar>
              <Avatar>
                <DescriptionIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemButton component={Link} to={`/${invoice.id}`}>
              <ListItemText primary={invoice.description} secondary={invoice.status} />
            </ListItemButton>
          </ListItem>
        )) : null}
      </List>

      <Fab
        variant="extended"
        color="primary"
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
        }}
        onClick={() => invoiceStore.addNewInvoice(id => history.push(`/${id}`))}
      >
        <AddIcon sx={{ mr: 1 }} />
        New Invoice
      </Fab>
    </React.Fragment>
  )
});

export default InvoiceList;