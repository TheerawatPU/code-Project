import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customer.js";
import locationRoutes from "./routes/location.js";
import stableRoutes from "./routes/stable.js";
import lotRoutes from "./routes/lot.js";
import employeeRoutes from "./routes/employee.js";
import unitRoutes from "./routes/unit.js"

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", customerRoutes);
app.use("/api", locationRoutes);
app.use("/", stableRoutes);
app.use("/", lotRoutes);
app.use("/", employeeRoutes);
app.use("/", unitRoutes);

app.listen(5500, () => {
  console.log("connected");
});
