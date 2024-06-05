const { response, request } = require('express');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const User = require('../models/user');
const Category = require('../models/category');
const Image = require('../models/image');  // Asegúrate de tener un modelo de 'images'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const updateImageCloudinary = async (req = request, res = response) => {
    try {
        const { collection, id } = req.params;  // Extrae los parámetros 'collection' e 'id' de la URL
        console.log({ collection, id });

        let model;

        // Busca el modelo correspondiente según la colección
        switch (collection) {
            case 'users':
                model = await User.findByPk(id);  // Busca un usuario por su ID
                if (!model) {
                    return res.status(400).json({
                        success: false,
                        message: `User not exist, ID: ${id}`
                    });
                }
                break;
            case 'categories':
                model = await Category.findByPk(id);  // Busca una categoría por su ID
                if (!model) {
                    return res.status(400).json({
                        success: false,
                        message: `Category not exist, ID: ${id}`
                    });
                }
                break;
            case 'images':
                model = await Image.findByPk(id);  // Busca una imagen por su ID
                if (!model) {
                    model = new Image({ product_id: id });  // Asigna solo product_id
                }
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'The option is not valid'
                });
        }

        // Si el modelo ya tiene una imagen, elimina la imagen existente en Cloudinary
        if (model.uri) {
            const nameImageArray = model.uri.split('/');
            const nameImage = nameImageArray[nameImageArray.length - 1];
            const [public_id] = nameImage.split('.');
            await cloudinary.uploader.destroy(`StorageImagesAppDelivery/${collection}/${public_id}`);
        }

        const { tempFilePath } = req.files.archive;  // Extrae la ruta temporal del archivo de la solicitud
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
            folder: `StorageImagesAppDelivery/${collection}`  // Sube la imagen a Cloudinary en la carpeta especificada
        });

        // Actualiza el campo 'uri' del modelo con la URL segura de Cloudinary
        model.uri = secure_url;

        console.log('DATOS' + model, model.dataValues);
        await model.save();  // Guarda el modelo actualizado en la base de datos

        console.log(tempFilePath);
        res.status(201).json({
            success: true,
            message: 'Image uploaded',
            data: model.uri
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
