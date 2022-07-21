const Route = require("../models/Route");
const User = require("../models/User");
const Score = require("../models/Score");


const ScoreController = {
    async create(req, res, next) {

        try {
            const score = await Score.create({...req.body, userId: req.user._id, routeId: req.params._id })
            await Route.findByIdAndUpdate(req.params._id, {
                $push: { scoresId: score._id },
            });
            await User.findByIdAndUpdate(req.user._id, {
                $push: { scoresId: score._id },
            });
            res.status(201).send({ message: 'Se creó tu puntuación!', score })
        } catch (error) {
            console.error(error)
            error.origin = 'score crear'
            next(error)

        }
    },
    async update(req, res) {
        try {
            const score = await Score.findByIdAndUpdate(req.params._id, {...req.body, userId: req.user._id, routeId: req.params._id }, { new: true })

            res.status(201).send({ message: `Puntuación modificada con éxito`, score});
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'No se pudo actualizar la puntuación' })
        }
    },
    async getAll(req, res) {
        try {
            const scores = await Score.find()
            res.status(200).send({ scores})
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'No se pudieron conseguir las puntuaciones' })

        }
    },
    async delete(req, res) {
        try {
            const score = await Score.findByIdAndDelete(req.params._id)
            res.status(200).send({ message: `Tu puntuación ha sido borrada`, score })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'Problema para borrar la puntuación' })
        }
    },
   
}
module.exports = ScoreController;