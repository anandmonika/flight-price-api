const{
    getFlightPrice
} = require("./price.controller");

const router = require("express").Router();

router.get("/price", getFlightPrice);

module.exports = router;