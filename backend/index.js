const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

// Importer le fichier productRoutes.js
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Importer le fichier authRoutes.js
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Importer le fichier user.js
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);
