const express = require('express');
const router = express.Router()
const ScoreController = require('../controllers/ScoreController');
const { authentication} = require("../middleware/authentication");


router.post('/route/:_id', authentication, ScoreController.create)
router.put('/score/:_id', authentication, ScoreController.update)
router.get('/', authentication, ScoreController.getAll)
// router.delete('/comment/:_id', authentication, isAuthor, CommentController.delete)

module.exports = router;