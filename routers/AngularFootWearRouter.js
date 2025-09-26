import express from "express";
import slipwearmodel from "../model/slipwearmodel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("📦 Incoming payload:", req.body);
    const product = new slipwearmodel(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("❌ Save error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await slipwearmodel.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await slipwearmodel.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
