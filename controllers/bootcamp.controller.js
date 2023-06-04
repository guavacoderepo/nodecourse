const Bootcamp = require("../models/bootcamp.model");
// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ status: true, msg: "get all bootcamps" });
};

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ status: true, msg: "get a bootcamp" });
};

// @desc    Create all bootcamps
// @route   POST /api/v1/bootcamps
// @access  Public
exports.createBootcamp = async (req, res, next) => {
  try {
    console.log(req.body);
    const bootcamp = await Bootcamp.create(req.body);

    console.log(bootcamp);

    res.status(200).json({ status: true });
  } catch (err) {
    res.status(400).json({ status: false, msg: `${err}` });
  }
};

// @desc    Update all bootcamps
// @route   PUT /api/v1/bootcamps/:id
// @access  private
exports.updateBootcamps = (req, res, next) => {
  res.status(200).json({ status: true, msg: "update all bootcamp" });
};

// @desc    Delete all bootcamps
// @route   DELETE /api/v1/bootcamps
// @access  private
exports.deleteBootcamps = (req, res, next) => {
  res.status(200).json({ status: true, msg: "delete all bootcamp" });
};
