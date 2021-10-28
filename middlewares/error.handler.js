// Este middleware muestra los errores y podríamos enviar el error a un sistema de tracking de errores
function logErrors (error, request, response, next) {
  console.log('Hola, soy el logError');
  console.error (error);
  next(error);
}

// Este middleware crea un formato cada vez que tengamos un error

function errorHandler (error, request, response, next) {
  // Aunque no usemos next debemos ponerlo porque es la forma en como
  // se detecta que es un middleware tipo error
  console.log('Hola, soy el errorHandler');
  res.status(500).json( {
    message: error,
    stack: error.stack
  }
  )
}

function boomErrorHandler (error, request, response, next) {
 if (error.isBoom) {
  console.log('Hola, soy el boomErrorHandler');
   const {output}= error;
   response.status(output.statusCode).json(output.payload)
 }

  next(error);
}


module.exports = { logErrors, errorHandler, boomErrorHandler};
