import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customer.js";
import locationRoutes from "./routes/location.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", customerRoutes);
app.use("/api", locationRoutes);

app.listen(5500, () => {
  console.log("connected");
});


