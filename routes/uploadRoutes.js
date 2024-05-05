const  {Router} = require('express');
const { updateImageCloudinary } = require('../controllers/uploadController');
const { validateFields } = require('../middlewares/validate-fields');
const { validateArchiveUpload } = require('../middlewares/validate-archive');


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

//actualizar la imagen

router.put('/:collection/:id',[
    validateFields,
    validateArchiveUpload

],updateImageCloudinary);





module.exports = router;