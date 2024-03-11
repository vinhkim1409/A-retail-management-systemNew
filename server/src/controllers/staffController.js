const Staff =require( "../models/staffModel");

const getAllStaff = (req, res, next) => {
  Staff.find()
    .then((books) => res.status(200).json(books))
    .catch(next);
};
module.exports = getAllStaff;
