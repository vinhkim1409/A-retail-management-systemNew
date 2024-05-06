const Staff = require("../models/staffModel");
const bcrypt = require("bcrypt");
const staffController = {
  getAllStaff: async (req, res, next) => {
    try {
      const staffs = await Staff.find({tenantID:req.tenantID, isDelete: false });
      console.log(req.tenantID)
      res.json(staffs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  addNewStaff: async (req, res) => {
    try {
      const { firstname, lastname, email, phone, avatar, position } = req.body;
      
      const staffExist = await Staff.findOne({tenantID:req.tenantID, email:email });
      if (staffExist) {
        
        res.json({ success: false, message: "Email is already in use" });
        return;
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash( req.body.password, salt);
      const newStaff = new Staff({
        firstname:firstname,
        lastname:lastname,
        email:email,
        phoneNumber:phone,
        avatar:avatar,
        position:position,
        password:hashed,
        tenantID:req.tenantID
      });
     
      await newStaff.save();
      const {password,...resStaff}=newStaff._doc;
      res.json({success:true,data:resStaff})

      // res.json({ success: true, staff: resStaff }); // khi co mk phai xoa mk trc khi respone
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteStaff: async (req, res, next) => {
    // const tenantId=req.tenantID

    try {
      const StaffDeleteCondition = { tenantID:req.tenantID,email: req.params.id }; // tenantId:tenantId
      const staff = await Staff.findOneAndUpdate(StaffDeleteCondition)
      if (staff.canModify)
      {
        return res.json({success:false,data: "This staff can't be delete"})
      }
      const deletStaff = await Staff.findOneAndUpdate(StaffDeleteCondition, {
        $set: { isDelete: true },
      });
      if (!deletStaff) {
        return res.json({ success: false, data: "Staff not found" });
      }
      res.json({
        success: true,
        data: "Staff deleted successfully",
        staff: deletStaff,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  updateStaff: async (req, res, next) => {
    // lay tenantID vao const tenantID để cấp quyền update cái staff, xử lý cái vụ update admin
    try {
      //khong cho doi email
      const { firstname, lastname, email, phoneNumber, avatar, position } =
        req.body;

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
      } else {
        res.json({
          success: true,
          message: "Staff updated successfully",
          staff: updateSatff,
        });
      }
    } catch (error) {}
  },
  getOneStaff: async (req, res, next) => {
    try {
      const staff = await Staff.findOne({email: req.params.id});
      res.json(staff);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
module.exports = staffController;
