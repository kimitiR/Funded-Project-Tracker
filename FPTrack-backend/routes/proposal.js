var express = require('express');
var router = express.Router();

var ProposalController = require('../controllers/api/proposal');

router.get(
    '/',
    function (req, res, next) {
        ProposalController.getAll(req, res, next);
    }
)

router.post(
    '/',
    function (req, res, next) {
        ProposalController.create(req, res, next);
    }
);

module.exports = router;