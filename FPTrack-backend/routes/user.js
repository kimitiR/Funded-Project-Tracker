var express = require('express');
var router = express.Router();

var UserController = require('../controllers/api/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get(
  '/:userId',
  function (req, res, next) {
    UserController.getById(req.params.userId, req, res, next);
  }
)

router.post(
  '/',
  function (req, res, next) {
    UserController.create(req, res, next);
  }
)

module.exports = router;
