import React from "react";
import "./SignupCustomer.scss";
import background from "../../../assets/login-background.png";
import {
  Divider,
  TextField,
  Button,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
function SignupCustomer() {
  return (
    <div className="signupCustomer-form">
      <div className={"inner"}>
        <div className="title">
          <p style={{ fontSize: 16, color: "black", marginBottom: 15 }}>
            Chào mừng bạn đến với
            <span style={{ fontSize: 16, color: "#1488DB", fontWeight: 500 }}>
              {" "}
              BK
            </span>
            <span style={{ fontSize: 16, color: "#00A699" }}>Book</span>.
          </p>

          <p style={{ fontSize: 20, fontWeight: 500, marginBottom: 15 }}>
            Đăng ký tài khoản mới
          </p>
        </div>

        <Divider variant="middle" theme={theme} />
        <ThemeProvider theme={theme}>
          <p className="lable">
            Thông tin tài khoản
          </p>
          <TextField
            name="email"
            label="Nhập Email / Tên đăng nhập"
            size="small"
            fullWidth
            color="bkbook"
            // onChange={(e) =>
            //   setValues({ ...values, [e.target.name]: e.target.value })
            // }
          />

          <div className="">
            <TextField
              name="password"
              label="Nhập mật khẩu"
              type="password"
              variant="outlined"
              color="bkbook"
              className="flex-1"
              size="small"
              // onChange={(e) =>
              //   setValues({ ...values, [e.target.name]: e.target.value })
              // }
            />

            <TextField
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              type="password"
              variant="outlined"
              color="bkbook"
              size="small"
              className="flex-1"
              // onChange={(e) =>
              //   setValues({ ...values, [e.target.name]: e.target.value })
              // }
            />
          </div>

          <Divider variant="middle" className="!py-1 !my-2" />
          <p className="lable">
            Thông tin cá nhân
          </p>
          <TextField
            name="name"
            label="Họ"
            variant="outlined"
            color="bkbook"
            fullWidth
            size="small"
            // onChange={(e) =>
            //   setValues({ ...values, [e.target.name]: e.target.value })
            // }
          />
          <TextField
            name="name"
            label="Tên"
            variant="outlined"
            color="bkbook"
            fullWidth
            size="small"
            // onChange={(e) =>
            //   setValues({ ...values, [e.target.name]: e.target.value })
            // }
          />

          <TextField
            name="phoneNumber"
            label="Số điện thoại"
            variant="outlined"
            color="bkbook"
            size="small"
            fullWidth
            // onChange={(e) =>
            //   setValues({ ...values, [e.target.name]: e.target.value })
            // }
          />
          <div className="fileArea">
            <label for="images" className="text-base">
              Ảnh đại diện
            </label>
            <input
              className="inputFile"
              type="file"
              name="images"
              id="images"
              required="required"
              multiple="multiple"
              // onChange={(e) => uploadFile(e.target.files[0])}
            />
            <div className="fileDummy">
              <div className="fileSuccess text-sm">
                Ảnh đại diện đã được chọn
              </div>
              <div className="fileDefault  text-sm">
                Click để chọn ảnh đại diện của bạn
              </div>
            </div>
          </div>

          <Button
            style={{ marginLeft: "auto", marginTop: 10, width: 120 }}
            variant="contained"
            size="large"
            color="bkbook"
          >
            ĐĂNG KÝ
          </Button>
        </ThemeProvider>
      </div>
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
