const { check } = require("express-validator");
const { Router, request, response } = require("express");
const { validateFields } = require("../middlewares/validate-fields");
const { verifyEmailLogin,verifyEmail } = require("../helpers/verify-email");
const { login, validateToken, updateDataUser } = require("../controllers/authController");
const { register } = require("../controllers/authController");
const { payment } = require("../controllers/authController");



const router = Router();


router.post('/login', [
    check('email', 'the field email is required').not().isEmpty(),
    check('email', 'this not valid email').isEmail(),
    check('email', 'El correo no existe en el sistema').exists(),
    check('email', 'the field email is required').custom(verifyEmailLogin),
    check('password', 'the field password is required').not().isEmpty(),
    validateFields
], login);

router.post('/register', [
    
    check('name', 'The name field is required').not().isEmpty(),
    check('lastName', 'The lastName field is required').not().isEmpty(),
    check('phone', 'The phone field is required').not().isEmpty(),
    check('email', 'The email field is required').not().isEmpty(),
    check('email', 'This is not a valid email').isEmail(),
    check('email', 'El correo electrónico ya existe en el sistema').custom(verifyEmail),
    check('password', 'The password field is required').not().isEmpty(),
    validateFields
], register);


router.get('/validate-token', validateToken);


router.post('/payment', [
    check('holder_name', 'The holder_name field is required').not().isEmpty(),
    check('card_number', 'The card_number field is required').not().isEmpty(),
    check('expiration_date', 'The expiration_date field is required').not().isEmpty(),
    check('cvc', 'The cvc field is required').not().isEmpty(),
    check('cuotes', 'The cuotes field is required').not().isEmpty(),
    check('type', 'The type field is required').not().isEmpty(),
    validateFields
], payment);


module.exports = router;