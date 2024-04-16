const { Router, request, response } = require("express");
const { register } = require("../controllers/authController");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { verifyEmail } = require("../helpers/verify-email");


const router = Router();


router.get('/login', (req = request, res = response) => {

    res.status(200).json({
        msg: 'login'
    });

});



router.post('/register',[
    check('name', 'Name field is required').not().isEmpty(),
    check('lastName', 'Last name field is required').not().isEmpty(),
    check('email', 'Email field is required').isEmail(),
    check('email', 'Email field is required').not().isEmpty(),
    check('email', 'Email already exists').custom(verifyEmail),
    check('password', 'Password field is required').not().isEmpty(),
    validateFields
] ,register);

module.exports = router;