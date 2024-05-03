const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, changePassword } = require("../controllers/usersController");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");
const { verifyEmailLogin, verifyEmail } = require("../helpers/verify-email");
const { register } = require("../controllers/authController");


const router = Router();

router.get('/', [
    validateJWT
], getUsers);



router.post('/', [
    
    check('name', 'The name field is required').not().isEmpty(),
    check('lastName', 'The lastName field is required').not().isEmpty(),
    check('phone', 'The phone field is required').not().isEmpty(),
    check('email', 'The email field is required').not().isEmpty(),
    check('email', 'This is not a valid email').isEmail(),
    check('email', 'El correo electrónico ya existe en el sistema').custom(verifyEmail),
    check('password', 'The password field is required').not().isEmpty(),
    validateFields
], register);

router.post('/change-password',[
    check('email', 'the field email is required').not().isEmpty(),
    check('email', 'this not valid email').isEmail(),
    check('email', 'the field email is required').custom(verifyEmailLogin),
    validateFields
], changePassword);


module.exports = router;