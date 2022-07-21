const express = require('express');
const router = express.Router()
const ScoreController = require('../controllers/ScoreController');
const { authentication, isAuthorScore} = require("../middleware/authentication");


router.post('/route/:_id', authentication, ScoreController.create)
router.put('/score/:_id', authentication, isAuthorScore, ScoreController.update)
router.get('/', authentication, ScoreController.getAll)
router.delete('/score/:_id', authentication, isAuthorScore, ScoreController.delete)

module.exports = router;