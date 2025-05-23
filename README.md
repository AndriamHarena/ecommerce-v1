# Étape de conception

## 🧱 1. Structure des dossiers

```
backend/
├── models/
│   └── Product.js
├── routes/
│   └── productRoutes.js
├── controllers/
│   └── productController.js
├── index.js
```

---

## 🧾 2. Créer le modèle `Product.js`

Dans `models/Product.js` :

```js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imageUrl: String,
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
```

---

## 🎮 3. Créer le contrôleur `productController.js`

Dans `controllers/productController.js` :

```js
const Product = require("../models/Product");

// CREATE
exports.createProduct = async (req, res) => {
    ...
};

// READ ALL
exports.getProducts = async (req, res) => {
    ...
};

// READ ONE
exports.getProduct = async (req, res) => {
    ...
};

// UPDATE
exports.updateProduct = async (req, res) => {
    ...
};

// DELETE
exports.deleteProduct = async (req, res) => {
    ...
};
```

---

## 🌐 4. Créer les routes `productRoutes.js`

Dans `routes/productRoutes.js` :

```js
const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
```

---

## 🔌 5. Connecter les routes à `index.js`

Dans `index.js` :

```js
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);
```

---

## ✅ 6. Tester avec Postman

Exemples d’URL pour tester :

* `GET http://localhost:5000/api/products` → voir tous les produits
* `POST http://localhost:5000/api/products/:id` → voir un produit
* etc.

---

### 👉 Prochaine étape

Quand tout ça marche, tu pourras :

1. Commencer le CRUD commandes de la même manière
2. Ou passer au frontend et consommer ces routes avec React

Souhaites-tu que je t’aide à créer aussi la partie **commande** ou à **brancher le frontend avec React** ?
