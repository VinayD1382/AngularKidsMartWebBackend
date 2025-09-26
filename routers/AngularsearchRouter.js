import express from "express";
import BoysWear from "../model/Boyswearmodel.js";
import GirlsWear from "../model/Girlswearmodel.js";
import Toys from "../model/Toysmodel.js";
import KidsEle from "../model/kidsmodel.js";
import Stationary from "../model/stationarymodel.js";
import Sale from "../model/salemodel.js";

const router = express.Router();

const models = [
  { model: BoysWear, category: "BoysWear" },
  { model: GirlsWear, category: "GirlsWear" },
  { model: Toys, category: "Toys" },
  { model: KidsEle, category: "KidsEle" },
  { model: Stationary, category: "Stationary" },
  { model: Sale, category: "Sale" },
];

// Search API
router.get("/:query", async (req, res) => {
  try {
    const query = req.params.query;

    for (let { model, category } of models) {
      const product = await model.findOne({
        name: { $regex: query, $options: "i" }, // case-insensitive
      });

      if (product) {
        return res.json({ ...product.toObject(), category });
      }
    }

    res.status(404).json({ message: "Product not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
