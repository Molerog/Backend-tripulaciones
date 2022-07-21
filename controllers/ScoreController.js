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
    // async update(req, res) {
    //     try {
    //         if (req.file) req.body.imagepath = req.file.filename;
    //         const comment = await Comment.findByIdAndUpdate(req.params._id, {...req.body, userId: req.user._id, routeId: req.params._id }, { new: true })

    //         res.status(201).send({ message: `Comentario modificado con éxito`, comment });
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).send({ message: 'No se pudo actualizar el comentario' })
    //     }
    // },
    // async getAll(req, res) {
    //     try {
    //         const comments = await Comment.find()
    //         res.status(200).send({ Number_of_comments: comments.length, comments })
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).send({ message: 'No se pudieron conseguir los comentarios' })

    //     }
    // },
    // async delete(req, res) {
    //     try {
    //         const comment = await Comment.findByIdAndDelete(req.params._id)
    //         res.status(200).send({ message: `Comentario ${comment.body} ha sido borrado`, comment })
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).send({ message: 'Problema para borrar el comentario' })
    //     }
    // },
   
}
module.exports = ScoreController;