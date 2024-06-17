const { Router } = require('express');
const { updateImageCloudinary } = require('../controllers/uploadController');
const { validateFields } = require('../middlewares/validate-fields');
const { validateArchiveUpload } = require('../middlewares/validate-archive');
const { check } = require("express-validator");

const router = Router();

// Ruta para actualizar la imagen
router.put('/:collection/:id', [
    validateFields,
    validateArchiveUpload
], updateImageCloudinary);

module.exports = router;
