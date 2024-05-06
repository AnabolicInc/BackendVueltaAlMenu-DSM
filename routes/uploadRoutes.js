const  {Router} = require('express');
const { updateImageCloudinary } = require('../controllers/uploadController');
const { validateFields } = require('../middlewares/validate-fields');
const { validateArchiveUpload } = require('../middlewares/validate-archive');
const { createCategory, updateCategory ,deleteCategory, getCategories} = require('../controllers/categoryController');
const { check } = require("express-validator");

const router = Router();


router.post('/createCategory',[
    check('name', 'the field name is required').not().isEmpty(),
    check('name', 'the field name is required').isString(),
    validateFields
], createCategory);


router.post('/updateCategory',[
    check('name', 'the field name is required').not().isEmpty(),
    check('name', 'the field name is required').isString(),
    validateFields
], updateCategory);


router.get('/getCategories',[
    validateFields
], getCategories);

router.delete('/deleteCategory/:id',[
    validateFields
], deleteCategory);

//actualizar la imagen

router.put('/:collection/:id',[
    validateFields,
    validateArchiveUpload

],updateImageCloudinary);





module.exports = router;