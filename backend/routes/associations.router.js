const express = require("express");
const associationController = require("../controllers/associations.controller");

const router = express.Router();


router.get('/', associationController.getAllAssociations);


module.exports = router;