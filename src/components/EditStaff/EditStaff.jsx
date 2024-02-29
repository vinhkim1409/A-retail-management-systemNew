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
} from "@mui/material";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
export default function EditStaff({openEdit,setOpenEdit,idStaff}) {
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
  const handleClose = () => setOpenEdit(false);
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
  let singleAvatar = [];
  let singleAvatarArray = [];
  const [avatar, setAvatar] = useState([]);
  const uploadAvatar = (e) => {
    singleAvatar.push(e.target.files);

    if (singleAvatar[0].length > 0) {
      singleAvatarArray.push(URL.createObjectURL(singleAvatar[0][0]));
      console.log(singleAvatarArray);
      setAvatar(singleAvatarArray);
    }
  };
  return (
    <div className="Addnewstaff-container">
      <Modal
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="Addnewstaff-container"
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
                  >
                    Avatar
                  </InputLabel>
                  <div className="avatar">
                    {avatar.length === 1 ? (
                      <>
                        <img src={avatar[0]} alt="" className="img" />
                      </>
                    ) : (
                      <>
                        <div className="input-avatar">
                          <label htmlFor="avatar">
                            <div className="label-box">
                              <FontAwesomeIcon icon={faUpload} className="icon" />
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
                  <OutlinedInput
                    size="small"
                    sx={{
                      boxShadow: 3,
                    }}
                    onChange={(event) => {
                      handleChangeInfo(event, "position");
                    }}
                    error={errorForm.position}
                  />
                  <FormHelperText error={errorForm.position}>
                    {errorForm.position ? "Please enter a Position" : ""}
                  </FormHelperText>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <div className="button">
            <div className="btn-box">
              <button className="btn">Yes</button>
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
