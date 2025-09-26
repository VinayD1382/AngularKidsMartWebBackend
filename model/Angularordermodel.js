import mongoose from "mongoose";

const AngularOrderSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  paymentMethod: { type: String, default: "COD" },
  products: [
    {
      productId: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
      imageUrl: { type: String },
      category: { type: String },
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" }
}, { timestamps: true });

AngularOrderSchema.pre("save", async function(next) {
  if (!this.id) {
    const lastOrder = await mongoose
      .model("AngularOrder", AngularOrderSchema)
      .findOne({})
      .sort({ id: -1 });
    this.id = lastOrder ? lastOrder.id + 1 : 1;
  }
  next();
});

export default mongoose.model("AngularOrder", AngularOrderSchema);
