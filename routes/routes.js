const express = require('express');
const router = express.Router();
const { authentication } = require('../middleware/authentication');
const RouteController = require('../controllers/RouteController');

router.post('/', RouteController.create);
router.get('/', authentication, RouteController.getAll);
router.get(
  '/allRoutesPage',
  authentication,
  RouteController.getAllRoutesPaginated
);
router.put('/likes/:_id', authentication, RouteController.like);
router.get('/route/:_id', authentication, RouteController.getById);
router.put('/dislike/:_id', authentication, RouteController.dislike);

module.exports = router;
