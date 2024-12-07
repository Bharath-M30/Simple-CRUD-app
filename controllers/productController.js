const ProductModel = require("../models/Product");

//get all products
const getProducts = async (req, res) => {
  try {
    const result = await ProductModel.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//get a single product by its id
const getProduct = async (req, res) => {
  try {
    const result = await ProductModel.findOne({ _id: req.params.id });
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//Create
const createProduct = async (req, res) => {
  try {
    const result = await ProductModel.create(req.body);
    console.log(result);
    res.status(201).json(req.body);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

//update
const updateProduct = async (req, res) => {
  try {
    const result = await ProductModel.updateOne(
      { _id: req.params.id },
      req.body
    );
    if (!result) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    const updatedProduct = await ProductModel.findById(req.params.id);
    console.log(updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

//delete
const deleteProduct = async (req, res) => {
  try {
    const result = await ProductModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(result);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
