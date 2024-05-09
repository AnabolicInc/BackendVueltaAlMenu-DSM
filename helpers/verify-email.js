const User = require("../models/user");



const verifyEmailLogin =  async (email) => {

    const existEmail = await User.findOne({ where: { email } });

    if (!existEmail) {
        throw new Error('El correo electrónico ingresado no existe.');
    }
}
  



const verifyEmailRegister = async (email) => {
    const existEmail = await User.findOne({ where: { email } });

    if (existEmail) {
        throw new Error('This email already exists');
    }
}


module.exports = {
    verifyEmail: verifyEmailRegister,
    verifyEmailLogin
};