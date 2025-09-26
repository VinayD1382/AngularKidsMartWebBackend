import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true }, // plain string
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre("save", async function(next) {
  if (!this.id) {
    const lastUser = await mongoose
      .model("AngularUser", UserSchema)
      .findOne({})
      .sort({ id: -1 });
    this.id = lastUser ? lastUser.id + 1 : 1;
  }
  next();
});

export default mongoose.model("AngularUser", UserSchema);
