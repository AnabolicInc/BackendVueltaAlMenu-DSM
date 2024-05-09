const { check } = require("express-validator");
const { Router, request, response } = require("express");
const { validateFields } = require("../middlewares/validate-fields");
const { verifyEmailLogin,verifyEmail } = require("../helpers/verify-email");
const { login, validateToken, updateDataUser } = require("../controllers/authController");
const { register } = require("../controllers/authController");



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

router.post('/reset-password', [
    check('email', 'the field email is required').not().isEmpty(),
    check('email', 'this not valid email').isEmail(),
    check('email', 'the field email is required').custom(verifyEmail),
    validateFields
], resetPassword);


router.get('/validate-token', validateToken);

module.exports = router;