const express = require('express');
const router = express.Router()
const CommentController = require('../controllers/CommentController');
const { authentication, isAuthor} = require("../middleware/authentication");
const {uploadCommentImages} = require('../middleware/multer');


router.post('/route/:_id', authentication, uploadCommentImages.single('imageComment'), CommentController.create)
router.put('/comment/:_id', authentication, isAuthor, uploadCommentImages.single('imageComment'), CommentController.update)
router.get('/', authentication, CommentController.getAll)
router.get('/allCommentsPage', authentication, CommentController.getAllPaginated)
router.delete('/comment/:_id', authentication, isAuthor, CommentController.delete)

module.exports = router;