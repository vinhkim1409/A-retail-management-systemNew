import * as React from "react";
import "./EditStaff.scss";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
  Box,
  Modal,
  TextField,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { api } from "../../constant/constant";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
export default function EditStaff({
  openEdit,
  setOpenEdit,
  emailEdit,
  setEmailEdit,
  stafflist,
  setStaffList,
  email
}) {
  // const handleOpen = () => {
  //   // let newError = {
  //   //   firstname: false,
  //   //   lastname: false,
  //   //   email: false,
  //   //   phonenumber: false,
  //   //   position: false,
  //   // };
  //   // setErrorForm(newError);
  //   // let newBasicInfo = {
  //   //   firstname: "",
  //   //   lastname: "",
  //   //   email: "",
  //   //   phone: "",
  //   //   position: "",
  //   // };
  //   setOpenEdit(true);
  // };
  const handleClose = () => {
    setEmailEdit("");
    setOpenEdit(false);
  };
  const [basicInfo, setBasicInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    position: "",
  });
  const userBusiness=useSelector((state)=>state.authBusiness.login?.currentUser)
  const config = {
    headers: {
      Authorization: `Bearer ${userBusiness?.accessToken}`,
    },
  };
  const getStaff = async () => {
    const staff = await axios.get(`${api}staff/${emailEdit}`,config);
    console.log(staff);
    setBasicInfo(staff.data);
    setAvatarEncode(staff.data.avatar);
  };
  useEffect(() => {
    getStaff();
  }, []);
  const [errorForm, setErrorForm] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phonenumber: false,
    position: false,
  });
  const handleChangeInfo = (event, item) => {
    const value = event.target.value;
    let newBasicInfo = basicInfo;
    if (item === "firstname") newBasicInfo.firstname = value;
    if (item === "lastname") newBasicInfo.lastname = value;
    if (item === "email") newBasicInfo.email = value;
    if (item === "phone") newBasicInfo.phoneNumber = value;
    if (item === "position") newBasicInfo.position = value;

    setBasicInfo(newBasicInfo);
    checkErrorName(item);
  };
  const checkErrorName = (item) => {
    if (item === "firstname") {
      let newError = {
        firstname: basicInfo.firstname === "",
        lastname: errorForm.lastname,
        email: errorForm.email,
        phonenumber: errorForm.phonenumber,
        position: errorForm.position,
      };

      setErrorForm(newError);
    }
    if (item === "lastname") {
      let newError = {
        firstname: errorForm.firstname,
        lastname: basicInfo.lastname === "",
        email: errorForm.email,
        phonenumber: errorForm.phonenumber,
        position: errorForm.position,
      };
      setErrorForm(newError);
    }
    if (item === "email") {
      let newError = {
        firstname: errorForm.firstname,
        lastname: errorForm.lastname,
        email: basicInfo.email === "",
        phonenumber: errorForm.phonenumber,
        position: errorForm.position,
      };
      newError.email = basicInfo.email === "";
      setErrorForm(newError);
    }
    if (item === "phone") {
      let newError = {
        firstname: errorForm.firstname,
        lastname: errorForm.lastname,
        email: errorForm.email,
        phonenumber: basicInfo.phoneNumber === "",
        position: errorForm.position,
      };
      setErrorForm(newError);
    }
    if (item === "position") {
      let newError = {
        firstname: errorForm.firstname,
        lastname: errorForm.lastname,
        email: errorForm.email,
        phonenumber: errorForm.phonenumber,
        position: basicInfo.position === "",
      };

      setErrorForm(newError);
    }
  };
  const [avatarEncode, setAvatarEncode] = useState("");
  const uploadAvatar = (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setAvatarEncode(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };
  const editStaff = async () => {
    const newStaff = basicInfo;
    newStaff.avatar = avatarEncode;
    const responseEdit = await axios.put(
      `${api}staff/update/${basicInfo._id}`,
      newStaff,config
    );
    console.log(responseEdit)
    //co 1 edit tai trang FE
    if (responseEdit.data.success) {
      console.log("success");
      const newStafflist = stafflist.map((staff) => {
        if (staff.email === emailEdit) {
          return {
            ...staff,
            firstname: newStaff.firstname,
            lastname: newStaff.lastname,
            phoneNumber: newStaff.phoneNumber,
            email: newStaff.email,
            position: newStaff.position,
            avatar: newStaff.avatar,
          };
        }
        return staff;
      });
      setStaffList(newStafflist);
    } else {
      console.log("error");
    }
    setOpenEdit(false);
  };
  return (
    <div className="Editnewstaff-container">
      <Modal
        open={openEdit}
        disableEscapeKeyDown
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="Editnewstaff-container"
      >
        <Box sx={style}>
          <div className="title">Edit Staff</div>
          <Grid container spacing={12}>
            <Grid container item xs={6}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="title"
                    style={{ fontWeight: 600, color: "gray" }}
                  >
                    First Name
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    sx={{
                      boxShadow: 3,
                    }}
                    value={basicInfo.firstname}
                    onChange={(event) => {
                      handleChangeInfo(event, "firstname");
                    }}
                    error={errorForm.firstname}
                  />
                  <FormHelperText error={errorForm.firstname}>
                    {errorForm.firstname ? "Please enter First Name" : ""}
                  </FormHelperText>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="title"
                    style={{ fontWeight: 600, color: "gray" }}
                  >
                    Last Name
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    sx={{
                      boxShadow: 3,
                    }}
                    value={basicInfo.lastname}
                    onChange={(event) => {
                      handleChangeInfo(event, "lastname");
                    }}
                    error={errorForm.lastname}
                  />
                  <FormHelperText error={errorForm.lastname}>
                    {errorForm.lastname ? "Please enter Last Name" : ""}
                  </FormHelperText>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="title"
                    style={{ fontWeight: 600, color: "gray" }}
                  >
                    Email
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    sx={{
                      boxShadow: 3,
                    }}
                    value={basicInfo.email}
                    onChange={(event) => {
                      handleChangeInfo(event, "email");
                    }}
                    error={errorForm.email}
                  />
                  <FormHelperText error={errorForm.email}>
                    {errorForm.email ? "Please enter a Email" : ""}
                  </FormHelperText>
                </Stack>
              </Grid>
              
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="title"
                    style={{ fontWeight: 600, color: "gray" }}
                  >
                    Phone Number
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    sx={{
                      boxShadow: 3,
                    }}
                    value={basicInfo.phoneNumber}
                    onChange={(event) => {
                      handleChangeInfo(event, "phone");
                    }}
                    error={errorForm.phonenumber}
                  />
                  <FormHelperText error={errorForm.phonenumber}>
                    {errorForm.phonenumber ? "Please enter Phone Number" : ""}
                  </FormHelperText>
                </Stack>
              </Grid>
            </Grid>
            <Grid container item xs={6}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="title"
                    style={{ fontWeight: 600, color: "gray" }}
                    className="title-avatar"
                  >
                    <div className="lable-input">Avatar</div>
                    <div className="choose-button">
                      <label htmlFor="avatar">
                        <div className="choose-img">Choose Picture</div>
                      </label>
                      <input
                        type="file"
                        name="image-business"
                        accept="image/*"
                        id="avatar"
                        hidden
                        onChange={uploadAvatar}
                      />
                    </div>
                  </InputLabel>
                  <div className="avatar">
                    {avatarEncode && avatarEncode.length > 1 ? (
                      <>
                        <img src={avatarEncode} alt="" className="img" />
                      </>
                    ) : (
                      <>
                        <div className="input-avatar">
                          <label htmlFor="avatar">
                            <div className="label-box">
                              <FontAwesomeIcon
                                icon={faUpload}
                                className="icon"
                              />
                            </div>
                          </label>
                          <input
                            type="file"
                            name="image-business"
                            accept="image/*"
                            id="avatar"
                            hidden
                            onChange={uploadAvatar}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="title"
                    style={{ fontWeight: 600, color: "gray" }}
                  >
                    Position
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={basicInfo.position}
                    label="Position"
                    onChange={(event) => handleChangeInfo(event, "position")}
                  >
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                    <MenuItem value={"Sales Associate"}>
                      Sales Associate
                    </MenuItem>
                    <MenuItem value={"Sales"}>Sales</MenuItem>
                    <MenuItem value={"Cashier"}>Cashier</MenuItem>
                    <MenuItem value={"Manager"}>Manager</MenuItem>
                    <MenuItem value={"Warehouse Staff"}>
                      Warehouse Staff
                    </MenuItem>
                  </Select>
                  <FormHelperText error={errorForm.position}>
                    {errorForm.position ? "Please enter a Position" : ""}
                  </FormHelperText>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <div className="button">
            <div className="btn-box">
              <button className="btn" onClick={editStaff}>
                Yes
              </button>
              <button className="btn" onClick={handleClose}>
                Cancle
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
