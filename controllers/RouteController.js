const Route = require('../models/Route');
const User = require('../models/User');
const axios = require('axios');

const URL_API = 'https://pilgrimtests.000webhostapp.com/mockapi/getall/';

const RouteController = {
  async create(req, res, next) {
    try {
      const result = await axios.get(URL_API);
      console.log('hola cabezahuevo');
      const routes = result.data;
      routes.map(route => {
        return Route.create({
          name: route.name,
          difficulty: route.difficulty,
          imagepath: route.image,
          duration: route.duration,
          startingPoint: route.startingPoint,
          endingPoint: route.endingPoint,
          description: route.description,
          tags: [route.tags],
          pois: [
            {
              id: route.pois.id,
              name: route.pois.name,
              description: route.pois.description,
              imagepath: route.pois.image,
              latitude: route.pois.latitude,
              longitude: route.pois.longitude
            }
          ]
        })
      });

      res.status(201).send(routes);
    } catch (error) {
      console.log(error);
      error.origin = 'Route';
      next(error)
    }
  },

  async getAll(req, res) {
    try {
      const routes = await Route.find({});
      console.log(routes.length);
      res.status(200).send(routes)
    } catch (error) {
      console.log(err);
      res.status(500).send({ message: 'Hubo un problema cargando las rutas' })
    }
  },

  async getAllRoutesPaginated(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const routes = await Route.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit);
      console.log('aqui', routes.length);
      res.status(200).send(routes)
    } catch (error) {
      console.error(error);
      res.status(400).send(
        { message: 'Ha habido un problema al cargar las rutas' }
      )
    }
  },

  async like(req, res) {
    try {
      const exist = await Route.findById(req.params._id);
      if (!exist.likes.includes(req.user._id)) {
        const route = await Route.findByIdAndUpdate(
          req.params._id,
          { $push: { likes: req.user._id } },
          { new: true }
        );
        await User.findByIdAndUpdate(
          req.user._id,
          { $push: { wishList: req.params._id } },
          { new: true }
        );
        res.send(route)
      } else {
        res.status(400).send(
          { message: 'No puedes dar más likes' }
        )
      }
    } catch (error) {
      res.status(500).send(
        { message: 'Hubo un problema dando un like' }
      )
    }
  },

  async getById(req, res) {
    try {
        const route = await Route.findById(req.params._id)
            // .populate(""); añadir lo que queramos que salga en routeDetail
        res.send(route)
    } catch (error) {
        console.error(error);
        res.status(500).send(
          { message: 'Ha habido un problema al cargar la ruta' }
        )
    }
}
};

module.exports = RouteController