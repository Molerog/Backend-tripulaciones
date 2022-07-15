const express = require('express');
const router = express.Router();
const UserController = require ('../controllers/UserController');
// const { authentication } = require('../middleware/authentication');
const {uploadUserImages} = require('../middleware/multer');


router.post('/', uploadUserImages.single('imageUser'),UserController.create);
router.get('/confirm/:email', UserController.confirm);
router.post('/login', UserController.login);


module.exports = router;