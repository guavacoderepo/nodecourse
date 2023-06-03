const express = require("express");
const dotenv = require("dotenv");

// load dotenv variables
dotenv.config({ path: "./config/config.env" });

// init express
const app = express();

// set port
const port = process.env.PORT || 8008;

// start listinig for request
app.listen(port, () => {
  console.log(`${process.env.NODE_ENV} server running on port ${port}`);
});
