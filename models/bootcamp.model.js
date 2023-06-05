const mongoose = require("mongoose");
const geocoder = require("../utils/nodegeocoder");

const BootcampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name can not be empty"],
      unique: true,
      trim: true,
      maxlength: [15, "Name can not be more then 15 chars"],
    },

    email: {
      type: String,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email can not be more then 15 chars",
      ],
    },

    description: {
      type: String,
      required: [true, "Description can not be empty"],
      trim: true,
      maxlength: [500, "Description can not be more then 500 chars"],
    },

    website: {
      type: String,
      match: [
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
        "Url bad format, please check",
      ],
    },

    address: {
      type: String,
      required: [true, "Address can not be empty"],
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },

      formattedAddress: String,
      street: String,
      city: String,
      zipcode: String,
    },

    role: {
      type: String,
      enum: ["staff", "customer"],
    },

    photo: {
      type: String,
      default: "no-photo.jpg",
    },
  },
  { timestamps: true }
);

// geocoder hooks and create location
BootcampSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    zipcode: loc[0].zipcode,
  };
  next();
});

module.exports = mongoose.model("bootcamp", BootcampSchema);
