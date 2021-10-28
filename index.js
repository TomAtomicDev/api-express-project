const express = require('express');
const cors = require('cors');

const routerApi = require('./Routers+Services');//el archivo index.js se busca en automático
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());//este es un Middleware

const whitelist = ['http://localhost:5500', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin)  {
      callback( null, true);
    } else {
      callback(new Error ('No tiene permiso para acceder'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send(`Hola! Este es el primer servidor programado por Tommy 😎💪💚
   Fue construido sobre NodeJS usando ExpressJS.
   Puedes probar la API en: https://obscure-bayou-83657.herokuapp.com/api/v1/products`)
});


routerApi(app); // Este es el index.js de routing con express como atributo


app.use(logErrors);//Es muy importante poner este primero xq lleva el next
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Estamos escuchando en el puerto http://localhost:${port}`)
})

