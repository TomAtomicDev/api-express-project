const express = require("express");
const cors = require("cors");

const routerApi = require("./Routers"); //el archivo index.js se busca en automático
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
} = require("./middlewares/error.handler");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //este es un Middleware

const whitelist = ["http://localhost:5500", "https://myapp.com"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No tiene permiso para acceder"));
    }
  }
};
app.use(cors(options));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/welcome.html");
});

routerApi(app); // Este es el index.js de routing con express como atributo

app.use(logErrors); //Es muy importante poner este primero xq lleva el next
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Estamos escuchando en el puerto http://localhost:${port}`);
});
