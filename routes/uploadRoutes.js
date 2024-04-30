const  {Router} = require('express');
const { updateImageCloudinary } = require('../controllers/uploadController');
const { validateFields } = require('../middlewares/validate-fields');
const { validateArchiveUpload } = require('../middlewares/validate-archive');


const router = Router();



//actualizar la imagen

router.put('/:colletion/:id',[
    validateFields,
    validateArchiveUpload

],updateImageCloudinary);



module.exports = router;