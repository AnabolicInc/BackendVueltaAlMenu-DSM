const {response, request} = require('express');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const User = require('../models/user');
const Category = require('../models/category');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

const  updateImageCloudinary = async (req = request, res = response) => {


    try {

        
        const { collection, id } = req.params;
        console.log({collection, id});
        
        let model;

        switch (collection) {
            case 'users':
                model = await User.findByPk(id);

                if(!model){
                    return res.status(400).json({
                        success: false,
                        message: `User not exist, ID: ${id}`
                    });
                }
                break;
            case 'categories':
                model = await Category.findByPk(id);
                if(!model){
                     return res.status(400).json({
                         success: false,
                         message: `Category not exist, ID: ${id}`
                     });
                }
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'The option is not valid'
                });
                break;
        }

        if(model.image){
            const nameImageArray = model.image.split('/');
            const nameImage = nameImageArray[nameImageArray.length - 1];
            const [ public_id ] = nameImage.split('.');
            cloudinary.uploader.destroy(`StorageImagesAppDelivery/${collection}/${public_id}`);
        }


        const {tempFilePath} = req.files.archive;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
            folder: `StorageImagesAppDelivery/${collection}`
        });

        // Update image to user
        model.image = secure_url;
        await model.save();


        console.log(tempFilePath);
        res.status(201).json({
            success: true,
            message: 'Image uploaded',
            data: model.image
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });

    }
}

module.exports = {
    updateImageCloudinary
}