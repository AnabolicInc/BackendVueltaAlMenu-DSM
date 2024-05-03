const User = require("../models/user");



const verifyEmailLogin =  async (email) => {

    const existEmail = await User.findOne({ where: { email } });

    if (!existEmail) {
        throw new Error('Invalid credentials.');
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