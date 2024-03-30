const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");
//load model
const Staff = require("../models/staffModel");

//test get all
router.get("/", async (req, res, next) => {
  try {
    const staffs = await Staff.find({isDelete:false});
    res.json(staffs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//[POST] /staff/add
router.post("/add", async (req, res) => {
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
});
//[DELETE] /staff/delete/:id
router.put("/delete/:id", async (req, res, next) => {
  // const tenantId=req.tenantID

  try {
    const StaffDeleteCondition = { email: req.params.id }; // tenantId:tenantId
    const deletStaff = await Staff.findOneAndUpdate(StaffDeleteCondition,{$set:{isDelete:true}});
    if (!deletStaff) {
      return res
        .status(401)
        .json({ success: false, message: "Staff not found" });
    }
    res.json({
      success: true,
      message: "Staff deleted successfully",
      staff: deletStaff,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
//[PUT] 'staff/update'
router.put("/update/:id", async (req, res, next) => {
  // lay tenantID vao const tenantID để cấp quyền update cái staff
  try {
    //khong cho doi email
    const { firstname, lastname, email, phoneNumber, avatar, position } = req.body;

    const UpdateStaffCondition = { _id: req.params.id }; //can 1 tenantID nữa
    //kiem tra email (co le se viet 1 ham kiem tra email)
    const updateSatff = await Staff.findByIdAndUpdate(
      UpdateStaffCondition,
      req.body,
      { new: true }
    );
    if (!updateSatff) {
      return res
        .status(401)
        .json({ success: false, message: "Staff not found" });
    }
    else{
    res.json({
      success: true,
      message: "Staff updated successfully",
      staff: updateSatff,
    });
  }
    
  } catch (error) {}
});
//[GET]"/staff/:id"
router.get("/:id", async (req, res, next) => {
  try {
    const staff = await Staff.findOne({email: req.params.id});
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
