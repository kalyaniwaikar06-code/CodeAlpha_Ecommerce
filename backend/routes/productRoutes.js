const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    try {

        const products = await Product.find();

        res.json(products);

    } catch (error) {

        res.status(500).json(error);
    }
});

// ADD PRODUCT
router.post("/", async (req, res) => {
    try {

        const {
            name,
            price,
            description,
            category,
            image
        } = req.body;

        const product = new Product({
            name,
            price,
            description,
            category,
            image
        });

        await product.save();

        res.json({
            message: "Product Added Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json(error);
    }
});

module.exports = router;