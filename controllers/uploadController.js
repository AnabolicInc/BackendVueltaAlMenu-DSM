const { response, request } = require('express');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const User = require('../models/user');
const Category = require('../models/category');
const Image = require('../models/image');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadToCloudinary = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: `StorageImagesAppDelivery/${folder}`
        });
        return result.secure_url;
    } catch (error) {
        throw new Error('Error uploading to Cloudinary');
    }
};

const deleteFromCloudinary = async (url, folder) => {
    if (!url) return;
    const nameImageArray = url.split('/');
    const nameImage = nameImageArray[nameImageArray.length - 1];
    const [public_id] = nameImage.split('.');
    await cloudinary.uploader.destroy(`StorageImagesAppDelivery/${folder}/${public_id}`);
};

const updateImageCloudinary = async (req = request, res = response) => {
    const { collection, id } = req.params;
    const { files } = req;
    const uploadedImages = [];

    if (!files || !files.archive) {
        return res.status(400).json({
            success: false,
            message: 'No files were uploaded'
        });
    }

    try {
        let model;

        switch (collection) {
            case 'users':
                model = await User.findByPk(id);
                if (!model) {
                    return res.status(400).json({
                        success: false,
                        message: `User not exist, ID: ${id}`
                    });
                }
                break;
            case 'categories':
                model = await Category.findByPk(id);
                if (!model) {
                    return res.status(400).json({
                        success: false,
                        message: `Category not exist, ID: ${id}`
                    });
                }
                break;
            case 'images':
                model = await Image.findByPk(id);
                if (!model) {
                    model = new Image({ product_id: id });
                }
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'The option is not valid'
                });
        }

        if ((collection === 'categories' && model.image) || (collection === 'users' && model.image)) {
            await deleteFromCloudinary(model.image, collection);
        } else if (collection === 'images' && model.uri) {
            await deleteFromCloudinary(model.uri, collection);
        }

        const fileArray = Array.isArray(files.archive) ? files.archive : [files.archive];

        for (const file of fileArray) {
            const { tempFilePath } = file;
            const secure_url = await uploadToCloudinary(tempFilePath, collection);
            uploadedImages.push(secure_url);

            if (collection === 'categories' || collection === 'users') {
                model.image = secure_url;
                await model.save();
            } else if (collection === 'images') {
                const imageRecord = new Image({
                    uri: secure_url,
                    product_id: id
                });
                await imageRecord.save();
            }
        }

        // Si es una categoría o un usuario, devolvemos solo una URL
        const responseData = (collection === 'categories' || collection === 'users') ? uploadedImages[0] : uploadedImages;

        res.status(201).json({
            success: true,
            message: 'Images uploaded',
            data: responseData
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    updateImageCloudinary
};
