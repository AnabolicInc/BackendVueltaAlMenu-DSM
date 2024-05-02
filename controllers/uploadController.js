const {response, request} = require('express');
const cloudinary = require('cloudinary').v2;
const User = require('../models/user');

const  updateImageCloudinary = async (req = request, res = response) => {
    try {
        const { collection, id } = req.params;
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
            default:
                return res.status(400).json({
                    success: false,
                    message: 'The option is not valid'
                });

        }

        if(model.image){
            const nameImageArray = model.image.split('/');
            const nameImage = nameImageArray[nameImageArray.length - 1];
            const [ public_id ] = nameImage.split('.');
            cloudinary.uploader.destroy(`StorageImagesAppDelivery/${collection}/${public_id}`);
            return res.status(200).json({
                success: true,
                message: 'Image deleted'
            });
        }


        const {tempFilePath} =req.files.archive;
        const { secure_url } = await cloudinary.uploader(tempFilePath, {
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

    }
}

module.exports = {
    updateImageCloudinary
}