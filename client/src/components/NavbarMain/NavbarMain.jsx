import React from "react";
import "./NavbarMain.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const Navbar = () => {
  return (
    <nav className="navbar-main">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img"/>
      </div>
      <div className="function-button">
        <div className="home">
          <Link to="/">
            <button className="feature-button">Home</button>
          </Link>
        </div>
        <div className="pricing">
          <Link to="/pricing">
            <button className="feature-button">Pricing</button>
          </Link>
        </div>
        <div className="contact">
          <Link to="/contact">
            <button className="feature-button">Contact</button>
          </Link>
        </div>
        <div className="FAQ">
          <Link to="/FAQ">
            <button className="feature-button">FAQ</button>
          </Link>
        </div>
        <div className="login">
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
