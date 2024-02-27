import CustomError from "../utils/CustomError.js";

const globalErrorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errorStatus = error.status || "error";
  const environment = process.env.NODE_ENV;

  if (environment === "production") {
    // Gestion de l'erreur pour l'ID de route non défini
    if (error.name === "CastError") {
      error = new CustomError(`No route found with id: ${error.value}`, 400);
    }

    // Gestion de l'erreur de clé dupliquée
    if (error.code === 11000) {
      const keyValue = Object.keys(error.keyValue)[0];
      error = new CustomError(`Duplicate field value: ${keyValue}`, 400);
    }

    // Gestion de l'erreur de validation mongoose
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors).map(
        (val) => val.message
      );
      const errorMsgStr = errorMessage.join(", ");
      error = new CustomError(
        `Validation error on fields: ${errorMsgStr}`,
        400
      );
    }

    res.status(statusCode).json({
      status: errorStatus,
      message: error.message,
    });
  } else {
    res.status(statusCode).json({
      status: errorStatus,
      message: error.message,
      errorStack: error.stack,
      error: error,
    });
  }
};

export default globalErrorHandler;
