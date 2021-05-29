const express = require("express");
const router = express.Router();
const index_controller = require("../controller/index");
const resource_controller = require("../controller/resource_controller");
const tweets_controller = require("../controller/twtController");
const user_controller = require("../controller/user_controller");
const passport = require("passport");
const cors = require("cors");
router.get("/states", cors(), index_controller.getStates);
router.get("/getState", cors(), index_controller.getByStateName);
router.get("/getIndiaSeriesData", cors(), index_controller.getInidaSeriesData);
router.get("/getStateSeriesData", cors(), index_controller.getStateSeriesData);
router.get("/getDistrictData", cors(), index_controller.districtWiseData);

router.get("/getTweets", cors(), tweets_controller.getAllTweets);
router.get("/getHospitalList", cors(), resource_controller.getHospitalList);

router.get("/getOxyList", cors(), resource_controller.getOxyList);

router.post("/signUp", user_controller.signUp);
router.post("/signIn", user_controller.createSession);
router.post("/profile", cors(), user_controller.upadate);

module.exports = router;
