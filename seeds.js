const mongoose = require("mongoose");
const Product = require("./models/products");

mongoose
  .connect("mongodb://localhost:27017/farmStand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("something went wrong: " + err);
  });

const p = [
  {
    name: "grapefruit",
    price: 10,
    category: "fruit",
  },
  {
    name: "milk",
    price: 3,
    category: "dairy",
  },
  {
    name: "chocalate",
    price: 10,
    category: "dairy",
  }
]

Product.insertMany(p);
