const express = require('express');
const router = express.Router();
const {authentication} = require('../middleware/authentication');

const RouteController = require ("../controllers/RouteController");

router.get('/',authentication, RouteController.getAll);


module.exports = router;