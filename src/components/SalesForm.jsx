import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  Grid,
} from '@mui/material';
import "./SalesForm.css"

function SalesForm() {
  const [sales, setSales] = useState([]);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');

  const handleAddSale = () => {
    if (productName && quantity > 0 && price) {
      const newSale = {
        productName,
        quantity,
        price,
      };
      setSales([...sales, newSale]);
      setProductName('');
      setQuantity(1);
      setPrice('');
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <Typography variant="h4">Enter Daily Sales</Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" alignItems="center">
            <Button variant="outlined" onClick={handleDecrement}>-</Button>
            <TextField
              type="number"
              variant="outlined"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              inputProps={{ min: 1 }}
            />
            <Button variant="outlined" onClick={handleIncrement}>+</Button>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddSale}
          >
            Add Sale
          </Button>
        </Grid>
      </Grid>
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h5">Sales Menu</Typography>
        <List>
          {sales.map((sale, index) => (
            <ListItem key={index}>
              {sale.productName} - {sale.quantity} units at ${sale.price} each
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

export default SalesForm;
