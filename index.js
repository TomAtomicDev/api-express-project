const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola, este es mi primer servidor!')
});

app.get('/products', (req, res) => {
  res.json([
    {
      name: 'Escritorio',
      price: 650
    },
    {
      name: 'Cómoda',
      price: 499
    }
  ])
});

app.get('/products/:id', (req, res) => {
  const {id}=req.params;
  res.json([
    {
      id,
      name: 'Escritorio',
      price: 650
    }
  ])
});

app.listen(port, () => {
  console.log(`Estamos escuchando en el puerto http://localhost:${port}`)
})
