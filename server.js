const express = require("express");
const dotenv = require("dotenv");
const connectMongo = require("./config/database");
const errorHandler = require("./middleware/error");
// import routers
const bootcamps = require("./routes/bootcomps");

// load dotenv variables
dotenv.config({ path: "./config/config.env" });

// connect to mongo database
connectMongo();

// init express
const app = express();

// middlewares
app.use(express.json());

// mount routs
app.use("/api/v1/bootcamp", bootcamps);

// error middleware
app.use(errorHandler);

// set port
const port = process.env.PORT || 8008;

// start listinig for request
const server = app.listen(port, () => {
  console.log(`${process.env.NODE_ENV} server running on port ${port}`);
});

// handle unhandled promise rejection
process.on("unhandleRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
