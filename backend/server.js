const User = require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const productRoutes = require("./routes/productRoutes");
const Cart = require("./models/Cart");
const Order = require("./models/Order");

const app = express();

app.use(cors());
app.use(express.json());

// ========================
// FRONTEND SERVE
// ========================
app.use(express.static(path.join(__dirname, "../frontend")));

// ========================
// MONGODB
// ========================
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ========================
// PRODUCTS
// ========================
app.use("/products", productRoutes);

// ========================
// CART - ADD
// ========================
app.post("/cart", async (req, res) => {
    try {

        console.log("BODY RECEIVED:", req.body);

        const { productName, price } = req.body;

        if (!productName || !price) {
            return res.status(400).json({ message: "Missing data" });
        }

        const item = new Cart({
            productName,
            price
        });

        await item.save();

        res.json({
            message: "Added to cart successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// ========================
// CART - GET
// ========================
app.get("/cart", async (req, res) => {
    try {
        const items = await Cart.find();
        res.json(items);
    } catch (err) {
        res.status(500).send(err);
    }
});

// ========================
// CART - DELETE
// ========================
app.delete("/cart/:id", async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);

        res.json({
            message: "Item removed"
        });

    } catch (err) {
        res.status(500).send(err);
    }
});

// ========================
// ORDER ROUTE
// ========================
app.post("/order", async (req, res) => {
    try {

        const cartItems = await Cart.find();

        let total = 0;

        cartItems.forEach(item => {
            total += item.price;
        });

        const customerName  = req.body.customerName;
        console.log("CUSTOMER NAME:",customerName);

      const order = new Order({
       customerName: customerName,
            totalAmount: total
           });

        await order.save();
        console.log("ORDER SAVED:",order);

        await Cart.deleteMany({});

        res.json({
            message: "Order Placed Successfully",
            totalAmount: total
        });

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
// GET ALL ORDERS
app.get("/orders/:customerName", async (req, res) => {
    try {

        const orders = await Order.find({
            customerName:
            req.params.customerName
        }
        );

        res.json(orders);

    } catch (err) {

        console.log(err);

        res.status(500).send(err);
    }
});

// ========================
// REGISTER
// ========================
app.post("/register", async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {
            return res.json({
                message: "User already exists"
            });
        }

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        res.json({
            message: "Registration Successful"
        });

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// ========================
// LOGIN
// ========================
app.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email,
            password
        });

        if (!user) {
            return res.json({
                message: "Invalid Credentials"
            });
        }

        res.json({
            message: "Login Successful",
            user
        });

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// ========================
// TEST ROUTES
// ========================
app.get("/", (req, res) => {
    res.send("Ecommerce Server Running");
});

app.get("/test", (req, res) => {
    res.send("Test Route Working");
});

// ========================
// START SERVER
// ========================
app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});