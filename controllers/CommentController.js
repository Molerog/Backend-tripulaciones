const Route = require("../models/Route");
const Comment = require("../models/Comment");
const User = require("../models/User");

const CommentController = {
  async create(req, res, next) {
    try {
      if (req.file) req.body.imagepath = req.file.filename;
      const comment = await Comment.create({
        ...req.body,
        userId: req.user._id,
        routeId: req.params._id,
      });
      await Route.findByIdAndUpdate(req.params._id, {
        $push: { commentsId: comment._id },
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { commentsId: comment._id },
      });
      res.status(201).send({ message: "Se creó tu comentario!", comment });
    } catch (error) {
      console.error(error);
      error.origin = "comment crear";
      next(error);
    }
  },

  async update(req, res) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params._id,
        {
          body: req.body.body,
          imagepath: req.file?.filename,
        },
        { new: true }
      );

      res
        .status(201)
        .send({ message: `Comentario modificado con éxito`, comment });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "No se pudo actualizar el comentario" });
    }
  },

  async getAll(req, res) {
    try {
      const comments = await Comment.find().populate("userId");
      res.status(200).send({ Number_of_comments: comments.length, comments });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "No se pudieron conseguir los comentarios" });
    }
  },

  async getAllPaginated(req, res) {
    try {
      const numberComments = await Comment.count();
      const { page = 1, limit = 10 } = req.query;
      const comments = await Comment.find()
        .populate("userId")
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.status(200).send({
        Number_of_comments: comments.length,
        comments,
        numberComments,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "No se pudieron conseguir los comentarios" });
    }
  },

  async delete(req, res) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params._id);
      res.status(200).send({
        message: `El comentario ${comment.body} ha sido borrado`,
        comment,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Hubo un problema al borrar el comentario" });
    }
  },
};

module.exports = CommentController;
