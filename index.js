const express = require('express');
const routerApi = require('./Routers+Services');//el archivo index.js se busca en automático
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3001;

app.use(express.json());//este es un Middleware

app.get('/', (req, res) => {
  res.send('Hola, este es mi primer servidor!')
});

app.listen(port, () => {
  console.log(`Estamos escuchando en el puerto http://localhost:${port}`)
})

routerApi(app); // Este es el index.js de routing con express como atributo


app.use(logErrors);//Es muy importante poner este primero xq lleva el next
app.use(boomErrorHandler);
app.use(errorHandler);
