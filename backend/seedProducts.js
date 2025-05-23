const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connecté à MongoDB");
        return Product.insertMany([
            {
                name: "Clavier mécanique RGB",
                description: "Clavier gamer avec rétroéclairage",
                price: 89.99,
                stock: 25,
                imageUrl: "https://example.com/images/clavier.jpg"
            },
            {
                name: "Souris sans fil Logitech",
                description: "Souris ergonomique silencieuse",
                price: 29.99,
                stock: 50,
                imageUrl: "https://example.com/images/souris.jpg"
            },
            {
                name: "Écran 24 pouces Full HD",
                description: "Écran LED 1080p pour le bureau",
                price: 149.00,
                stock: 15,
                imageUrl: "https://example.com/images/ecran.jpg"
            }
        ]);
    })
    .then(() => {
        console.log("Produits insérés avec succès !");
        mongoose.disconnect();
    })
    .catch((err) => {
        console.error("Erreur :", err);
        mongoose.disconnect();
    });
