var express = require('express');
var router = express.Router();

var ProjectController = require('../controllers/api/project');

router.get(
    '/',
    function (req, res, next) {
        ProjectController.getAll(req, res, next);
    }
)

router.get(
    '/:projectId',
    function (req, res, next) {
        ProjectController.getById(req.params.projectId, req, res, next);
    }
)

router.post(
    '/',
    function (req, res, next) {
        ProjectController.create(req, res, next);
    }
);

module.exports = router;