const Order = require('../models/Order');
const Product = require('../models/Product');

// CREATE
exports.createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { products } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Aucun produit fourni pour la commande." });
        }

        // Calcul du prix total
        let totalPrice = 0;
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Produit avec ID ${item.product} introuvable.` });
            }
            totalPrice += product.price * item.quantity;
        }

        const newOrder = new Order({
            user: userId,
            products,
            totalPrice
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la commande.", error });
    }
};

// READ ALL BY USER
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ user: userId }).populate('products.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des commandes.", error });
    }
};

// READ ONE BY USER
exports.getOrderById = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;

        const order = await Order.findOne({ _id: orderId, user: userId }).populate('products.product');
        if (!order) {
            return res.status(404).json({ message: "Commande introuvable." });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la commande.", error });
    }
};

// READ ALL
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('products.product').populate('user', 'email role');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de toutes les commandes.", error });
    }
};
