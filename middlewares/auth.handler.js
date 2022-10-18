const boom = require("@hapi/boom");

const { config } = require("./../config/config");

function checkApiKey(req, res, next) {
  const apiKey = req.headers["api"];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized("Sorry, you have a wrong token or don't have any"));
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user;
  if (user.role === "admin") {
    next();
  } else {
    next(boom.unauthorized());
  }
} // Este es un middleware para un solo rol, pero es mejor hacerlo dinámico.

function checkRoles(...roles) {
  //usamos el spread operator para trasformar los argumentos en un único array
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      next(boom.unauthorized("Sorry, this role can't do this."));
    }
  };
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };
