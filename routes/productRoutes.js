const { check } = require("express-validator");
const { Router, request, response } = require("express");
const { validateFields } = require("../middlewares/validate-fields");
const { createProduct, updateProduct, listProducts, deleteProduct } = require("../controllers/productController");


const router = Router(); 



router.get('/listProducts', [
], listProducts);

router.patch('/deleteProduct/:id',[
    validateFields
], deleteProduct);

module.exports = router;