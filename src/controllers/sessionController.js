const Firebase = require('../utils/Firebase');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

module.exports = {
    async signIn(req, res){
        try {
            const { email, password } = req.body;
            let firebase_uid;

            try {
                firebase_uid = await Firebase.login(email, password);
            } catch (error) {
                return res.status(403).json({ message: 'Invalid Credentials' });
            }
            const [user] = await User.read({firebase_uid});

            const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2d" });
            return res.status(200).json({ accessToken, user });

        } catch (error) {
            console.warn(error);
            return res.status(500).json({ message: 'Error while trying to validate credentials' })
        }
    }
}