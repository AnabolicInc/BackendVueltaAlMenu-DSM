const { response, request } = require("express");
const Category = require("../models/category");
const { check } = require("express-validator");
const bcryptjs = require("bcryptjs");
const generateJWT = require("../helpers/generate-jwt");
const jwt = require("jsonwebtoken");

const listCategories = async (req = request, res = response) => {
    try {
        const categories = await Category.findAll();

        res.status(200).json({
            success: true,
            data: categories
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

const createCategory = async (req = request, res = response) => {
    try {
        const { name,
            description
        } = req.body;

        const category = await Category.create({ name , description, status: 1 });

        res.status(201).json({
            success: true,
            data: category,
            message: 'Category created'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

const updateCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(400).json({
                success: false,
                message: `Category not exist, ID: ${id}`
            });
        }

        await category.update({ name });

        res.status(201).json({
            success: true,
            data: category,
            message: 'Category updated'
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

        await category.destroy();

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
    createCategory,
    updateCategory,
    deleteCategory
}