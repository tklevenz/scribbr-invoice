import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import PropTypes from 'prop-types';
import { useState } from 'react';

const InvoiceLineItem = ({ item, onUpdate }) => {
  const [lineItem, updateLineItem] = useState(item);

  const handleChange = (field, value) => {
    const updatedItem = {
      ...lineItem,
      [field]: value,
    }

    updateLineItem(updatedItem);
    onUpdate(updatedItem);
  }

  return (
    <ListItem key={item.id}>
      <Box
        component="div"
        sx={{
          '& > :not(style)': { m: 1, width: '30%' },
        }}
        mt={2}
      >
        <TextField
          size="small"
          label="Description"
          value={lineItem.description}
          onChange={(event) => handleChange('description', event.target.value)}
        />
        <TextField
          size="small"
          label="Hours"
          type="number"
          value={lineItem.hours}
          onChange={(event) => handleChange('hours', event.target.value)}
        />
        <TextField
          size="small"
          label="Rate"
          type="number"
          value={lineItem.rate}
          onChange={(event) => handleChange('rate', event.target.value)}
        />
      </Box>
    </ListItem>
  )
}

InvoiceLineItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    hours: PropTypes.string,
    rate: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default InvoiceLineItem;
