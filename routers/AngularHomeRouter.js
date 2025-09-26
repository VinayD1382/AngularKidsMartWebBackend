import express from "express";
import AngularHomeProduct from "../model/AngularHomeProduct.js";
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const product = new AngularHomeProduct(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await AngularHomeProduct.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE (optional)
router.delete("/:id", async (req, res) => {
  try {
    await AngularHomeProduct.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Update a product
router.put("/:id", async (req, res) => {
  try {
    const product = await AngularHomeProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
