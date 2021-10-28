const boom = require("@hapi/boom");

function validatorHandler (schema, property) {
return (req, res, next) => {
  const data= req[property];
  // Estamos rescatando la info de forma dinámica
  // O sea que la info puede venir en
  // req.body   ;   req.params   ;   req.query
  const {error} = schema.validate(data, {abortEarly: false});
  if (error) {
    next(boom.badRequest(error));
  }

  next(); // si todo va bien, adelante, siga e ingrese el servicio
}
};

module.exports = validatorHandler;
