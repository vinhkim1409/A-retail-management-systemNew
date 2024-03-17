const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  // tenantID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref:'business',
  //   required: true,
  // },
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
    required: true,
  },
  avatar: { type: String, required: true },
  position: {
    type: String,
    required: true,
  },
  isDelete: { type: Boolean, required: true},
});

const Staff = mongoose.model("staffs", staffSchema);

module.exports = Staff;