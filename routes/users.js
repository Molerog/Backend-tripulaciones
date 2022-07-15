const express = require('express');
const router = express.Router();
const UserController = require ('../controllers/UserController');
const {authentication} = require('../middleware/authentication');
const {uploadUserImages} = require('../middleware/multer');


router.post('/', uploadUserImages.single('imageUser'),UserController.create);
router.post('/login', UserController.login);
router.delete('/',authentication,UserController.userDelete);
// router.get('/confirm/:email', UserController.confirm);


module.exports = router;

