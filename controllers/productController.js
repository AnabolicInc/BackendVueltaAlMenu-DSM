const { response, request } = require("express");
const Product = require("../models/product");
const Category = require("../models/category");
const { check } = require("express-validator");
const bcryptjs = require("bcryptjs");
const generateJWT = require("../helpers/generate-jwt");
const jwt = require("jsonwebtoken");


const listProducts = async (req = request, res = response) => {
    try {
        const products = await Product.findAll();

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

const createProduct = async (req = request, res = response) => {
    try {

        const { category_id } = req.params;

        const { 
            name,
            description,
            price,
            quantity
        } = req.body;

        const category = await Category.findByPk(category_id);

        if (!category) {
            return res.status(400).json({
                success: false,
                message: `Category not exist, ID: ${category_id}`
            });
        }

        const findProduct = await Product.findOne({where: {name: name.toUpperCase()}})

        if (findProduct) {
            return res.status(400).json({
                success: false,
                message: `Product already exist, name: ${name}`
            });
        }
        
        const product = await Product.create({ name: name.toUpperCase(), description, price, quantity, category_id });

        res.status(201).json({
            success: true,
            data: product,
            message: 'Product created'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

const updateProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { 
            name,
            description,
            price,
            quantity
        } = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(400).json({
                success: false,
                message: `Product does not exist, ID: ${id}`
            });
        }

        await product.update({ name, description, price, quantity });

        res.status(201).json({
            success: true,
            data: product,
            message: 'Product updated'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

const deleteProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(400).json({
                success: false,
                message: `Product does not exist, ID: ${id}`
            });
        }

        await product.update({ status: false});

        res.status(201).json({
            success: true,
            data: product,
            message: 'Product deleted'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}


module.exports = {
    listProducts,
    createProduct,
    updateProduct,
    deleteProduct
}