const mongoose = require("mongoose");

const connection = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  });

  console.log(`mongo is connect to ${conn.connection.host}`);
};

module.exports = connection;
