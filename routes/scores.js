const express = require('express');
const router = express.Router()
const ScoreController = require('../controllers/ScoreController');
const { authentication} = require("../middleware/authentication");


router.post('/route/:_id', authentication, ScoreController.create)
// router.put('/comment/:_id', authentication, isAuthor, uploadCommentImages.single('imageComment'), CommentController.update)
// router.get('/', authentication, CommentController.getAll)
// router.delete('/comment/:_id', authentication, isAuthor, CommentController.delete)

module.exports = router;