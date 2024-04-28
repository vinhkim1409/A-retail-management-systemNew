const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    tenantID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "business",
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    avatar: { type: String },
    password: { type: String },
    position: {
      type: String,
      required: true,
    },
    isDelete: { type: Boolean, required: true, default: false },
    canModify: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.model("staffs", staffSchema);

module.exports = Staff;
