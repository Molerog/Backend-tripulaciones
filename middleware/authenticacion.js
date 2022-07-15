const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const authentication = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: payload._id, tokens: token });
        if (!user) {
            return res.status(401).send({ message: 'No estas autorizado' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema con el token' })
    }      
      
}


const isTheUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params._id);
        if (user._id.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: "You don't have permissions for that!" });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There was a problem checking your identity' })
    }
}

module.exports = { authentication, isAdmin,isAuthorPost, isAuthorComment, isTheUser };