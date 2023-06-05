const mongoose = require("mongoose");

const BootcampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name can not be empty"],
      unique: true,
      trim: true,
      maxlength: [15, "name can not be more then 15 chars"],
    },

    email: {
      type: String,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "email can not be more then 15 chars",
      ],
    },

    description: {
      type: String,
      required: [true, "description can not be empty"],
      trim: true,
      maxlength: [500, "description can not be more then 500 chars"],
    },

    website: {
      type: String,
      match: [
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
        "url bad format, please check",
      ],
    },

    location: {
      type: {
        type: String,
        // required: true,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        // required: true,
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

module.exports = mongoose.model("bootcamp", BootcampSchema);
