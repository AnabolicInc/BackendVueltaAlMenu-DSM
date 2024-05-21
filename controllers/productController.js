const { response, request } = require("express");
const Product = require("../models/product");
const { check } = require("express-validator");
const bcryptjs = require("bcryptjs");
const generateJWT = require("../helpers/generate-jwt");
const jwt = require("jsonwebtoken");

const listProducts = async (req = request, res = response) => {
    try {
        const products = await Product.findAll({where: {status: 1, category_id: req.query.category_id}});

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

const deleteCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        
        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(400).json({
                success: false,
                message: `Category not exist, ID: ${id}`
            });
        }

        await category.update({ status: 0 });

        res.status(201).json({
            success: true,
            message: 'Category deleted'
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
    listCategories,
    deleteCategory
}