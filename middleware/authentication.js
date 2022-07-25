const User = require('../models/User');
const Comment = require('../models/Comment');
const Score = require('../models/Score');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: payload._id, tokens: token });
        if (!user) {
            return res.status(401).send({ message: 'No estás autorizado.' })
        };
        req.user = user;
        next()
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error, message: 'Ha habido un problema con el token.' })
    }
};

const isAuthor = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params._id);
        if (comment.userId.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Este comentario no es tuyo' })
        };
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema al comprobar la autoría del comentario' })
    }
};

const isAuthorScore = async (req, res, next) => {
    try {
        const score = await Score.findById(req.params._id);
        if (score.userId.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Esta puntuación no es tuya' })
        };
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema al comprobar la autoría de la puntuación' })
    }
};

module.exports = { authentication, isAuthor, isAuthorScore }