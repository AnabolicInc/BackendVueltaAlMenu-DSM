const { Router, request, response } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { createCategory, updateCategory } = require("../controllers/categoryController");


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

module.exports = router;