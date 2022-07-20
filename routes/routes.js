const express = require('express');
const router = express.Router();
const {authentication} = require('../middleware/authentication');

const RouteController = require ("../controllers/RouteController");

router.post('/', RouteController.create)
router.get('/',authentication, RouteController.getAll);
router.get('/allRoutesPage',authentication, RouteController.getAllRoutesPaginated);



module.exports = router;