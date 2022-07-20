const Route = require ("../models/Route");

const RouteController = {
    async getAll(req,res){
        try {
          const routes =  await Route.find({})
          res.status(200).send(routes)
        } catch (error) {
            console.log(err)
            res.status(500).send ({message: "Hubo un problema cargando las rutas"})
        }
    }
}

module.exports = RouteController