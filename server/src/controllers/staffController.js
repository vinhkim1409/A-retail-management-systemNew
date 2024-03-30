const Staff = require("../models/staffModel");

const getAllStaff = async (req, res, next) => {
  try {
    const staffs = await Staff.find({ isDelete: false });
    res.json(staffs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const addNewStaff = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, avatar, position } = req.body;

    const staffExist = await Staff.findOne({ email });
    if (staffExist) {
      res.status(400);
      res.json({ success: false, error: "Email is already in use" });
      return;
    }
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.json({ success: true, staff: newStaff }); // khi co mk phai xoa mk trc khi respone
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = [getAllStaff,addNewStaff];
