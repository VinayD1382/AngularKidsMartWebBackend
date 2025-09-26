import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import angularHomeProductRoutes from "./routers/AngularHomeRouter.js";
import routeboyswear from "./routers/AngularBoysWearRouter.js";
import routegirlswear from "./routers/AngularGirlsWearRouter.js";
import routegames from "./routers/AngularGamesRouter.js";
import routekidsele from "./routers/AngularKidsRouter.js";
import routesale from "./routers/AngularSaleRouter.js";
import routestationary from "./routers/AngularStationaryRouter.js";
import routetoys from "./routers/AngularToysRouter.js";
import routefooter from "./routers/AngularFootWearRouter.js"
import routeorder from "./routers/AngularOrderRouter.js"
import routeuserlogin from "./routers/AngularUserLoginRouter.js"
import searchRoute from "./routers/AngularsearchRouter.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/angular-boyswear", routeboyswear);
app.use("/api/angular-home-products", angularHomeProductRoutes);
app.use("/api/angular-girlswear", routegirlswear);
app.use("/api/angular-footwear", routefooter);
app.use("/api/angular-games", routegames);
app.use("/api/angular-kidsele", routekidsele);
app.use("/api/angular-sale", routesale);
app.use("/api/angular-stationary", routestationary);
app.use("/api/angular-toys", routetoys);
app.use("/api/angular-orders", routeorder);
app.use("/api/angular-users", routeuserlogin);
app.use("/api/search", searchRoute);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Backend is running & connected to MongoDB Atlas 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
