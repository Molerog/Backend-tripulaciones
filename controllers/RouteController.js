const Route = require("../models/Route");
const axios = require("axios");

const URL_API = "https://pilgrimtests.000webhostapp.com/mockapi/getall/";

const RouteController = {
  async create(req, res, next) {
    try {
      const result = await axios.get(URL_API);
      // await db.dropCollection("routes");
      const routes = await Route.create(...result.data);
      res.status(201).send(routes);
    } catch (error) {
      console.log(error);
      error.origin = "Route";
      next(error);
    }
  },

  async getAll(req, res) {
    try {
      const routes = await Route.find({});
      console.log(routes.length);
      res.status(200).send(routes);
    } catch (error) {
      console.log(err);
      res.status(500).send({ message: "Hubo un problema cargando las rutas" });
    }
  },
  async getAllRoutesPaginated(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const routes = await Route.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit);
      console.log("aqui", routes.length);
      res.status(200).send(routes);
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .send({ message: "Ha habido un problema al cargar las rutas" });
    }
  },
};

module.exports = RouteController;
