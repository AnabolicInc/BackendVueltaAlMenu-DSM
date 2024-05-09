const { check } = require("express-validator");
const { Router, request, response } = require("express");
const { validateFields } = require("../middlewares/validate-fields");
const { createCategory, updateCategory, listCategories, deleteCategory } = require("../controllers/categoryController");


const router = Router(); 

router.post('/createCategory',[
    check('name', 'the field name is required').not().isEmpty(),
    check('name', 'the field name is required').isString(),
    check('description', 'the field description is required').not().isEmpty(),
    check('description', 'the field description is required').isString(),
    validateFields
], createCategory);



router.post('/updateCategory',[
    check('name', 'the field name is required').not().isEmpty(),
    check('name', 'the field name is required').isString(),
    validateFields
], updateCategory);

router.get('/listCategories', [
    
], listCategories);

router.delete('/deleteCategory/:id',[
    validateFields
], deleteCategory);

module.exports = router;