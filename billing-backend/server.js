const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3002; // You can change this port
const dbURI = "mongodb+srv://billing:billing@cluster0.2ucu9wa.mongodb.net/"; // Replace with your MongoDB connection URI

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Sale schema
const saleSchema = new mongoose.Schema({
  productName: String,
  quantity: Number,
  price: Number,
  date: { type: Date, default: Date.now },
});

const Sale = mongoose.model("Sale", saleSchema);

// Add new sale
app.post("/api/sales", async (req, res) => {
  const { productName, price, quantity } = req.body;
  if (!productName || !price || !quantity) {
    return res.status(400).json({ error: "Missing required data" });
  }

  try {
    const newSale = new Sale({
      productName,
      price,
      quantity,
    });

    await newSale.save();

    res.status(201).json({ message: "Sale added successfully" });
  } catch (error) {
    console.error("Error adding sale:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get sales by date range
app.get("/api/sales", async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: "Missing date range parameters" });
  }

  try {
    const filteredSales = await Sale.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    res.status(200).json(filteredSales);
  } catch (error) {
    console.error("Error fetching sales by date range:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
