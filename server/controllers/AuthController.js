const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../schema/Client/UserSchema');
const secretKey = process.env.SECRET_TOKEN_KEY;

const creatToken = (id, maxAge) => {
    return jwt.sign({ id }, process.env.SECRET_TOKEN_KEY, {
        expiresIn: maxAge
    })
}
const signUp = async (req, res) => {
    try {
        const { email, userName, phone, password } = req.body;

        // Check if the user with the same email or userName already exists
        const existingUser = await User.findOne({ $or: [{ email }, { userName }] });

        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'User with the same email or userName already exists' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new User({ email, userName, phone, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        const maxAge = 50 * 365 * 24 * 60 * 60;

        const token = creatToken(newUser._id, maxAge)
        res.cookie("user", token, {
            withCrdentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });
        res.status(200).json({ status: true, user: newUser._id, created: true });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ status: 'error', message: 'Registration failed'.error });
    }
};

const signIn = async (req, res) => {
    const { role } = req.params;
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.json({ status:false, message: "constant.MSG_FOR_USER_NOT_FOUND" });
    }
      const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.json({ status:false, message: "constant.MSG_FOR_WRONG_PASSWORD" });
    }

    if(role == user.role){
        const maxAge = 50 * 365 * 24 * 60 * 60;
        const token = creatToken(user._id, maxAge)
        res.cookie(user.role, token, {
            withCrdentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });
        res.status(200).json({ status: true, user: user, created: true });
    }
    else{
        return res.json({ status:false, message: "constant.MSG_FOR_INVALID_CREDENTIALS" });
    }
};

module.exports = {
    signUp,
    signIn,
};
