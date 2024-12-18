const expresss = require("express");
const router = expresss.Router();

//import controllers
const {localFileUpload} = require("../controllers/fileUpload/localFileUpload")
const {imageReduceUpload} = require("../controllers/fileUpload/imageReduceUpload")
const {imageUpload} = require("../controllers/fileUpload/imageUpload")
const {videoUpload} = require("../controllers/fileUpload/videoUpload")

//map controllers with path
router.post("/localFileUpload" , localFileUpload);
router.post("/imageUpload" , imageUpload);
router.post("/videoUpload" , videoUpload);
router.post("/imageReduceUpload" , imageReduceUpload);

module.exports = router;

