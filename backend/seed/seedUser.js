const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config({ path: "../.env" });

// Connexion à la base
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log("Connecté à MongoDB");

        const hashedAdmin = await bcrypt.hash("admin123", 10);
        const hashedUser = await bcrypt.hash("user123", 10);

        return User.insertMany([
            {
                name: "Alice Admin",
                email: "alice@admin.com",
                password: hashedAdmin,
                role: "admin"
            },
            {
                name: "Bob Utilisateur",
                email: "bob@user.com",
                password: hashedUser,
                role: "user"
            }
        ]);
    })
    .then(() => {
        console.log("Utilisateurs insérés avec succès !");
        mongoose.disconnect();
    })
    .catch((err) => {
        console.error("Erreur :", err);
        mongoose.disconnect();
    });
