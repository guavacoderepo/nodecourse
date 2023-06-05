const { message } = require("statuses");
const ErrorResponse = require("../utils/errorResponses");
const { object } = require("webidl-conversions");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Cast Error handler
  if (err.name === "CastError") {
    const message = `id: ${err.value} not found`;
    error = new ErrorResponse(message, 404);
  }

  // Duplcate field error
  if (err.code === 11000) {
    const message = `Duplicate field value enter`;
    error = new ErrorResponse(message, 400);
  }

  // Validation errors handler
  if (err.name === "ValidationError") {
    console.log(err.name);
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ status: false, msg: error.message || "Server Error" });
};

module.exports = errorHandler;
