const { check } = require("express-validator");
const { Router, request, response } = require("express");
const { validateFields } = require("../middlewares/validate-fields");
const { createProduct, updateProduct, listProducts, deleteProduct } = require("../controllers/productController");


const router = Router(); 

router.post('/createProduct/:category_id',[
    check('name', 'the field name is required').not().isEmpty(),
    check('name', 'the field name is required').isString(),
    check('price', 'the field description is required').not().isEmpty(),
    check('price', 'the field description is required').isNumeric(),
    check('description', 'the field description is required').not().isEmpty(),
    check('description', 'the field description is required').isString(),
    check('quantity', 'the field description is required').not().isEmpty(),
    check('quantity', 'the field description is required').isNumeric(),
    validateFields
], createProduct);



router.put('/updateProduct/:id',[
    check('name', 'the field name is required').not().isEmpty(),
    check('name', 'the field name is required').isString(),
    check('description', 'the field description is required').not().isEmpty(),
    check('description', 'the field description is required').isString(),
    validateFields
], updateProduct);

router.get('/listProducts', [
    
], listProducts);

router.put('/deleteProduct/:id',[
    validateFields
], deleteProduct);

module.exports = router;