import mongoose from "mongoose";

const Angularsalemodel = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: String, required: true },
  oldPrice: { type: Number, default: null },
  onSale: { type: Boolean, default: false },
  quantity: { type: Number, default: 1 },
}, { timestamps: true });

Angularsalemodel.pre("save", async function(next) {
  if (!this.id) {
    const lastProduct = await mongoose
      .model("SaleAngularProduct", Angularsalemodel)
      .findOne({})
      .sort({ id: -1 });
    this.id = lastProduct ? lastProduct.id + 1 : 1;
  }
  next();
});

export default mongoose.model("SaleAngularProduct", Angularsalemodel);
