import express from "express";
import games from "../model/games.js";
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("POST /api/angular-games called"); 
  try {
    const product = new games(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await games.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
