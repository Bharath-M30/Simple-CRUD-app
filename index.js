require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/products", productRoute);

//connecting to DB
const dbConnect = async () => {
  try {
    const uri = process.env.DATABASE_URI;
    await mongoose.connect(uri);
    console.log("Connected to DB...");
  } catch (error) {
    console.error(error);
  }
};
dbConnect();


//app running info
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
