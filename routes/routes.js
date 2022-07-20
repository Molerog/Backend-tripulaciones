const express = require('express');
const router = express.Router();
const RouteController = require ("../controllers/RouteController");

router.get('/', RouteController.getAll);


module.exports = router;