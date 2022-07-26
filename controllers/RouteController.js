const Route = require("../models/Route");
const User = require("../models/User");
const axios = require("axios");
const mongoose = require("mongoose");

const db = mongoose.connection;

const URL_API = "https://api-routes-data.herokuapp.com/getRoutes/";

const RouteController = {
  async create(req, res, next) {
    try {
      const result = await axios.get(URL_API);
      await db.dropCollection("routes");
      const routes = await Route.create(...result.data);
      res.status(201).send(routes);
    } catch (error) {
      console.error(error);
      error.origin = "Route";
      next(error);
    }
  },

  async getAll(req, res) {
    try {
      const routes = await Route.find({}).populate("scoresId")
      res.status(200).send(routes);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Hubo un problema cargando las rutas" });
    }
  },

  async getAllRoutesPaginated(req, res) {
    try {
      const numberRoutes = await Route.count();
      const { page = 1, limit = 10 } = req.query;
      const routes = await Route.find({}).populate("scoresId")

        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.status(200).send({ routes, numberRoutes });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .send({ message: "Ha habido un problema al cargar las rutas" });
    }
  },

  async like(req, res) {
    try {
      const exist = await Route.findById(req.params._id)
      if (!exist.likes.includes(req.user._id)) {
        const route = await Route.findByIdAndUpdate(
          req.params._id,
          { $push: { likes: req.user._id } },
          { new: true }
        ).populate("scoresId")
        await User.findByIdAndUpdate(
          req.user._id,
          { $push: { likes: req.params._id } },
          { new: true }
        );
        res.send(route);
      } else {
        res.status(400).send({ message: "No puedes dar más likes" });
      }
    } catch (error) {
      res.status(500).send({ message: "Hubo un problema dando un like" });
    }
  },

  async getById(req, res) {
    try {
      const route = await Route.findById(req.params._id).populate({
        path: "commentsId",
        populate: {
          path: "userId",
        },
      });
      res.send(route);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al cargar la ruta" });
    }
  },

  async dislike(req, res) {
    try {
      const exist = await Route.findById(req.params._id);
      if (exist.likes.includes(req.user._id)) {
        const route = await Route.findByIdAndUpdate(
          req.params._id,
          { $pull: { likes: req.user._id } },
          { new: true }
        ).populate("scoresId")
        await User.findByIdAndUpdate(
          req.user._id,
          { $pull: { likes: req.params._id } },
          { new: true }
        );
        res.status(200).send({ message: "Me gusta quitado", route });
      } else {
        res.status(400).send({ message: "No puedes quitar más likes" });
      }
    } catch (error) {
      res.status(500).send({ message: "Hubo un problema quitando un like" });
    }
  },

  async getRoutesByTransport(req, res) {
    try {
      const transport = req.params.transport;
      const routes = await Route.find({ transport });
      const numberRoutes = routes.length;
      if (routes === null) {
        res
          .status(400)
          .send({ message: "Lo siento, no pudimos encontrar esas rutas" });
        return;
      }
      res.status(200).send({routes, numberRoutes});
    } catch (error) {
      console.error(error);
    }
  },
  async getRoutesByTypePag(req, res) {
    try {
      const type = req.params.type;
      const { page = 1, limit = 10 } = req.query;
      const routes = await Route.find({ type })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      const numberRoutes = routes.length;
      if (routes === null) {
        res
          .status(400)
          .send({ message: "Lo siento, no pudimos encontrar esas rutas" });
        return;
      }
      res.status(200).send({ numberRoutes, routes });
    } catch (error) {
      console.error(error);
    }
  },
  async getRoutesByType(req, res) {
    try {
      const type = req.params.type;
      const routes = await Route.find({ type });
      const numberRoutes = routes.length;
      if (routes === null) {
        res
          .status(400)
          .send({ message: "Lo siento, no pudimos encontrar esas rutas" });
        return;
      }
      res.status(200).send({ numberRoutes, routes });
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = RouteController;
