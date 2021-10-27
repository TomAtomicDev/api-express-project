const express = require('express');
const routerApi = require('./Routers+Services');//el archivo index.js se busca en automático

const app = express();
const port = 3000;

app.use(express.json());//este es un Middleware

app.get('/', (req, res) => {
  res.send('Hola, este es mi primer servidor!')
});

app.listen(port, () => {
  console.log(`Estamos escuchando en el puerto http://localhost:${port}`)
})

routerApi(app);
