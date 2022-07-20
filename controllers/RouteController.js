const Route = require ("../models/Route");

const RouteController = {
    async getAll(req,res){
        try {
          const routes =  await Route.find({})
          console.log(routes.length)
          res.status(200).send(routes)
        } catch (error) {
            console.log(err)
            res.status(500).send ({message: "Hubo un problema cargando las rutas"})
        }
    },
    async getAllRoutesPaginated(req, res) {
        try {
          const { page = 1, limit = 10 } = req.query;
          const routes = await Route.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit);
            console.log("aqui",routes.length)
          res.status(200).send(routes)
        } catch (error) {
          console.error(error)
          res.status(400).send({ message: 'Ha habido un problema al cargar las rutas' })
        }
      },
}
 

module.exports = RouteController