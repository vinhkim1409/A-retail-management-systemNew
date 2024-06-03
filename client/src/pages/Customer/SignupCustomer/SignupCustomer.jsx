import React, { useEffect, useState } from "react";
import "./SignupCustomer.scss";
import background from "../../../assets/login-background.png";
import {
  Divider,
  TextField,
  Button,
  CircularProgress,
  createTheme,
  ThemeProvider,
  Snackbar, Alert
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../../constant/constant";

function SignupCustomer() {
  const { tenantURL } = useParams();
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [businessName, setBusinessName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openWrongCofirm, setOpenWrongConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate=useNavigate()
  const handleChangeInfo = (event, attribute) => {
    setCustomerInfo({ ...customerInfo, [`${attribute}`]: event.target.value });
  };
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleSignupCustomer = async (e) => {
    e.preventDefault();
    if (customerInfo.password != confirmPassword) {
      setErrorMessage("Password and confirm password are not the same")
      setOpenWrongConfirm(true);
      return;
    }
    const newCustomer = {
      email: customerInfo.email,
      password: customerInfo.password,
      firstName: customerInfo.firstName,
      lastName: customerInfo.lastName,
      phoneNumber: customerInfo.phoneNumber,
      tenantURL: tenantURL,
    };
    const resRegister = await axios.post(`${api}customer/signup`, newCustomer);
    if (resRegister.data.success) {
      setOpenSuccess(true);
      setTimeout(() => {
        navigate(`/${tenantURL}/customer/login`);
      }, 2000);
    } else {
      setErrorMessage(resRegister.data.message)
      setOpenWrongConfirm(true);
    }
  };
  const getBusinessInfo = async () => {
    const businessInfo = await axios.get(`${api}business/info/${tenantURL}`);
    console.log(businessInfo.data);
    setBusinessName(businessInfo.data?.data?.name);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWrongConfirm(false);
    setOpenSuccess(false)
  };
  useEffect(() => {
    getBusinessInfo();
  }, []);
  return (
    <div className="signupCustomer-form">
      <div className={"inner"}>
        <div className="title">
          <p style={{ fontSize: 16, color: "black", marginBottom: 15 }}>
            Welcome to
            <span style={{ fontSize: 16, color: "#1488DB", fontWeight: 500 }}>
              {" "}
              {businessName}
            </span>
            {/* <span style={{ fontSize: 16, color: "#00A699" }}>Book</span>. */}
          </p>

          <p style={{ fontSize: 20, fontWeight: 500, marginBottom: 15 }}>
            Register a new account
          </p>
        </div>

        <Divider variant="middle" theme={theme} />
        <ThemeProvider theme={theme}>
          <p className="lable">Account information</p>
          <TextField
            name="email"
            label="Enter Email"
            size="small"
            fullWidth
            color="bkbook"
            required
            onChange={(event) => {
              handleChangeInfo(event, "email");
            }}
          />

          <div className="">
            <TextField
            required
              name="password"
              label="Enter Password"
              type="password"
              variant="outlined"
              color="bkbook"
              className="flex-1 mr-2"
              size="small"
              onChange={(event) => {
                handleChangeInfo(event, "password");
              }}
            />

            <TextField
            required
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              color="bkbook"
              size="small"
              className="flex-1 "
              onChange={handleChangeConfirmPassword}
            />
          </div>

          <Divider variant="middle" className="!py-1 !my-2" />
          <p className="lable">Personal information</p>
          <TextField
          required
            name="name"
            label="First Name"
            variant="outlined"
            color="bkbook"
            fullWidth
            size="small"
            onChange={(event) => {
              handleChangeInfo(event, "firstName");
            }}
          />
          <TextField
          required
            name="name"
            label="Last Name"
            variant="outlined"
            color="bkbook"
            fullWidth
            size="small"
            onChange={(event) => {
              handleChangeInfo(event, "lastName");
            }}
          />

          <TextField
          required
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            color="bkbook"
            size="small"
            fullWidth
            onChange={(event) => {
              handleChangeInfo(event, "phoneNumber");
            }}
          />
          <Button
            style={{ marginLeft: "auto", marginTop: 10, width: 120 }}
            variant="contained"
            size="large"
            color="bkbook"
            onClick={(event) => {
              handleSignupCustomer(event);
            }}
            disabled={
              !customerInfo.password ||
              !customerInfo.email ||
              !customerInfo.phoneNumber ||
              !customerInfo.lastName ||
              !customerInfo.firstName ||
              !confirmPassword
            }
          >
            Sign Up
          </Button>
        </ThemeProvider>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openWrongCofirm}
        autoHideDuration={2000}
        onClose={handleClose}
        message={errorMessage}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleClose}
        message={"Sign Up Successfully"}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
         {"Sign Up Successfully"}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SignupCustomer;
const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          fontSize: "12px",
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          height: "42px",
          color: "white",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          width: "480px",
          marginBottom: "30px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "20px",
          fontSize: "16px",
        },
        input: {
          "&::placeholder": {
            color: "red",
          },
          color: "white", // if you also want to change the color of the input, this is the prop you'd use
        },
      },
    },

    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: "16px",
          fontFamily: "'Josefin Sans', sans-serif",
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: "16px",
          fontFamily: "'Josefin Sans', sans-serif",
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        sx: {
          fontSize: "16px",
          fontFamily: "'Josefin Sans', sans-serif",
        },
      },
    },
  },

  palette: {
    bkbook: {
      main: "#00A699",
    },
  },
});
