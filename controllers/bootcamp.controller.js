const Bootcamp = require("../models/bootcamp.model");
const ErrorResponse = require("../utils/errorResponses");

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  let query;

  // spread operator
  const reqQuery = { ...req.query };

  // fields to remove
  const removeFields = ["select"];

  // loop over and remove fields
  removeFields.forEach((param) => delete reqQuery[param]);

  // stringify query
  let queryStr = JSON.stringify(reqQuery);

  // create operator for gt, gte, lt, lte, in
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  try {
    // query mongo
    query = Bootcamp.find(JSON.parse(queryStr));

    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");

      query.select(fields);
    }
    const bootcamp = await query;

    res.status(200).json({ status: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(new ErrorResponse(`id: ${err.value} not found`, 404));
    }

    res.status(200).json({ status: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc    Create all bootcamps
// @route   POST /api/v1/bootcamps
// @access  Public
exports.createBootcamp = async (req, res, next) => {
  try {
    const url = req.body.website;

    if (!url.includes("http://") || !url.includes("https://")) {
      req.body.website = `https://${url}`;
    }

    const bootcamp = await Bootcamp.create(req.body);

    res.status(200).json({ status: true });
  } catch (err) {
    next(err);
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
