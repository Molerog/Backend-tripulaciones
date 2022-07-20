const Route = require('../models/Route');

const RouteController = {
  async getAll(req, res) {
    try {
      const routes = await Route.find({});
      console.log(routes.length);
      res.status(200).send(routes);
    } catch (error) {
      console.log(err);
      res.status(500).send({ message: 'Hubo un problema cargando las rutas' });
    }
  },
  async getAllRoutesPaginated(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const routes = await Route.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.status(200).send(routes);
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .send({ message: 'Ha habido un problema al cargar las rutas' });
    }
  },
  // async like(req, res) {
  //   try {
  //     const exist = await Post.findById(req.params._id);
  //     if (!exist.likes.includes(req.user._id)) {
  //       const post = await Post.findByIdAndUpdate(
  //         req.params._id,
  //         { $push: { likes: req.user._id } },
  //         { new: true }
  //       );
  //       await User.findByIdAndUpdate(
  //         req.user._id,
  //         { $push: { wishList: req.params._id } },
  //         { new: true }
  //       );
  //       res.send(post);
  //     } else {
  //       res.status(400).send({ message: "You can't give more likes" });
  //     }
  //   } catch (error) {
  //     res.status(500).send({ message: 'There was an issue in the controller' });
  //   }
  // },
};

module.exports = RouteController;
