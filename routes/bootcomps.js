const express = require("express");

const {
  getBootcamp,
  getBootcamps,
  deleteBootcamps,
  updateBootcamps,
  createBootcamp,
} = require("../controllers/bootcamp.controller");

const router = express.Router();

router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .delete(deleteBootcamps)
  .put(updateBootcamps)
  .get(getBootcamp);

module.exports = router;
