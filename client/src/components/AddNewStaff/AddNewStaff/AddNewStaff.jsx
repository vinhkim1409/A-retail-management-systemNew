import * as React from "react";
import "./AddNewStaff.scss";
import {
  Grid,
  Box,
  Modal,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { api } from "../../../constant/constant";
import {imageDB} from "../../../firebase/firebaseConfig"
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {v4} from "uuid"

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

export default function AddNewStaff({ stafflist, setStaffList }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    let newError = {
      firstname: false,
      lastname: false,
      email: false,
      phonenumber: false,
      position: false,
    };
    setErrorForm(newError);
    let newBasicInfo = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      position: "",
    };
    setBasicInfo(newBasicInfo);
    setAvatarEncode("");
    setOpen(false);
  };
  const [basicInfo, setBasicInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    position: "",
  });
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
    if (item === "phone") newBasicInfo.phone = value;
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
        phonenumber: basicInfo.phone === "",
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
  const [avatar,setAvatar] = useState("")
  const uploadAvatar = async (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setAvatarEncode(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
    const imgRef =ref(imageDB,`files/${v4()}`)
  const snapshot= await uploadBytes(imgRef,e.target.files[0],"data_url")
  const url=await getDownloadURL(snapshot.ref)
  setAvatar(url)
  };

  const addStaff = async () => {
    const haveerror = Object.values(errorForm).includes(true);
    const newStaff = {
      lastname: basicInfo.lastname,
      firstname: basicInfo.firstname,
      email: basicInfo.email,
      phoneNumber: basicInfo.phone,
      avatar: avatarEncode,
      position: basicInfo.position,
      isDelete: false,
    };
    //check newstaff nhanh hon
    try {
      const responce = await axios.post(`${api}staff/add`, newStaff);
      setStaffList([...stafflist, newStaff]);
      handleClose();
      
    } catch (err) {
      console.log("false");
    }
  };
const testDelete=async(imgurl)=>{
  
}
  return (
    <div className="Addnewstaff-container">
      <button className="btn" onClick={handleOpen}>
        Add
      </button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="Addnewstaff-container"
        disableEscapeKeyDown
      >
        <Box sx={style}>
          <div className="title">Add New Staff</div>
          <Grid container spacing={12}>
            <Grid container item xs={6}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="title"
                    style={{ fontWeight: 600, color: "gray" }}
                    className="label"
                  >
                    First Name
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    sx={{
                      boxShadow: 3,
                    }}
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
                    className="label"
                  >
                    Last Name
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    sx={{
                      boxShadow: 3,
                    }}
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
                    className="label"
                  >
                    Email
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    sx={{
                      boxShadow: 3,
                    }}
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
                    className="label"
                  >
                    Phone Number
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    sx={{
                      boxShadow: 3,
                    }}
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
                    className="label"
                  >
                    Avatar
                  </InputLabel>
                  <div className="avatar">
                    {avatarEncode.length > 1 ? (
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
                    className="label"
                  >
                    Position
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={basicInfo.position}
                    label="Position"
                    onChange={(event) => handleChangeInfo(event, "position")}
                  >
                    <MenuItem value={"Sales Associate"}>
                      Sales Associate
                    </MenuItem>
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
              <button className="btn" onClick={handleClose}>
                Cancle
              </button>
              <button
                className="btn"
                onClick={() => {
                  // addStaff();
                  console.log(avatar)
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
