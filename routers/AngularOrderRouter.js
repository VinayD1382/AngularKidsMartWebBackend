import express from "express";
import AngularOrder from "../model/Angularordermodel.js"; 

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, address, products, totalAmount, paymentMethod } = req.body;

    if (!name || !email || !phone || !address || !products || !totalAmount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newOrder = new AngularOrder({
      name,
      email,
      phone,
      address,
      products,
      totalAmount,
      paymentMethod: paymentMethod || "COD"
    });

    await newOrder.save();
    res.status(201).json({ message: "✅ Order placed successfully!", orderId: newOrder._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Failed to place order" });
  }
});

router.get("/user-orders/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const orders = await AngularOrder.find({ email }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Error fetching user orders:", err);
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await AngularOrder.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Failed to fetch orders" });
  }
});

/*
router.patch("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!status) return res.status(400).json({ error: "Status is required" });

    const updatedOrder = await AngularOrder.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ error: "Order not found" });

    res.status(200).json({ message: `Order #${orderId} status updated to ${status}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update order status" });
  }
});*/
router.patch("/:id", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10); 
    const { status } = req.body;

    if (!status) return res.status(400).json({ error: "Status is required" });

    const updatedOrder = await AngularOrder.findOneAndUpdate(
      { id: orderId },   
      { status },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ error: "Order not found" });

    res.status(200).json({ message: `Order #${orderId} status updated to ${status}` });
  } catch (err) {
    console.error("❌ Error updating order status:", err);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

export default router;
