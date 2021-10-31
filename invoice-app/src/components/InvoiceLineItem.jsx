import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import PropTypes from 'prop-types';
import { useState } from 'react';

const InvoiceLineItem = ({ item, onChange }) => {
  const [description, setDescription] = useState(item.description);
  const [hours, setHours] = useState(item.hours);
  const [rate, setRate] = useState(item.rate);

  const handleUpdate = (field, value) => {
    if (field === 'description') setDescription(value);
    if (field === 'hours') setHours(value);
    if (field === 'rate') setRate(value);

    onChange({
      ...item,
      [field]: value
    });
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
          value={description}
          onChange={(event) => handleUpdate('description', event.target.value)}
        />
        <TextField
          size="small"
          label="Hours"
          value={hours}
          onChange={(event) => handleUpdate('hours', event.target.value)}
        />
        <TextField
          size="small"
          label="Rate"
          value={rate}
          onChange={(event) => handleUpdate('rate', event.target.value)}
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
  onChange: PropTypes.func.isRequired,
}

export default InvoiceLineItem;
