const { check } = require("express-validator");
const { Router, request, response } = require("express");
const { validateFields } = require("../middlewares/validate-fields");
const { createAddress, listAddresses } = require("../controllers/addressController");


const router = Router(); 

router.post('/createAddress/:user_id',[
    check('address', 'the field address is required').not().isEmpty(),
    check('address', 'the field address is required').isString(),
    check('neighborhood', 'the field neighborhood is required').not().isEmpty(),
    check('neighborhood', 'the field neighborhood is required').isString(),
    check('latitude', 'the field latitude is required').not().isEmpty(),
    check('latitude', 'the field latitude is required').isNumeric(),
    check('longitude', 'the field longitude is required').not().isEmpty(),
    check('longitude', 'the field longitude is required').isNumeric(),
    validateFields
], createAddress);

router.get('/listAddresses/:user_id', [
    
], listAddresses);

module.exports = router;