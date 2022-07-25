const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authentication");
const RouteController = require("../controllers/RouteController");

router.post("/", RouteController.create)
router.get("/", authentication, RouteController.getAll)
router.get("/allRoutesPage", authentication, RouteController.getAllRoutesPaginated)
router.get("/route/:_id", authentication, RouteController.getById)
router.put("/likes/:_id", authentication, RouteController.like)
router.put("/dislike/:_id", authentication, RouteController.dislike)
router.get('/search/:transport',authentication, RouteController.getRoutesByTransport)
router.get('/searchByTypePag/:type',authentication, RouteController.getRoutesByTypePag)
router.get('/searchByType/:type',authentication, RouteController.getRoutesByType)



module.exports = router