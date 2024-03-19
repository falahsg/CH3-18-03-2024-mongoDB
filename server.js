require("dotenv/config");
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT;

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("Connection to the database successful");
  });

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty"],
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  city: String,
  country: {
    type: String,
    required: true,
    default: "Indonesia",
  },
});

const Customer = mongoose.model("Customer", customerSchema);

const customerTest = new Customer({
  name: "Falah sg",
  email: "falahsg18@gmail.co",
  phoneNumber: "0812121212",
});

customerTest
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("ERROR : " + err);
  });

app.listen(PORT, () => {
  console.log(`APP running on port : ${PORT}`);
});
