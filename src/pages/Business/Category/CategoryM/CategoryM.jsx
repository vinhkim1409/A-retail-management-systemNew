import React, { useState } from "react";
import "./CategoryM.scss";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import AddNewCategory from "../../../../components/AddNewCategory/AddNewCategory";
import AddProductCatalog from "../AddProductCatalog/AddProductCatalog";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 30, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 30, textTransform: "capitalize" } },
  },
}));
function CategoryM() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [state, setState] = useState({
    checkedA: false,
  });
  const [ids, setIds] = useState([]);
  const handleChange = (name) => (event) => {
    if (name === "checkedA")
      setState({ ...state, [name]: event.target.checked });
  };
  const handleChangeCheck = (item) => {
    if (ids.includes(item.id)) {
      const updateIds = ids.filter((n) => n != item.id);
      setIds(updateIds);
    } else {
      setIds([...ids, item.id]);
    }
  };
  const categorys = [
    {
      id: 1,
      name: "Ao thun",
      numOfProducts: 333,
    },
    {
      id: 2,
      name: "Ao thun",
      numOfProducts: 3,
    },
    {
      id: 3,
      name: "Ao thun",
      numOfProducts: 3,
    },
    {
      id: 4,
      name: "Ao thun",
      numOfProducts: 3,
    },
  ];
  //add products to category
  const [open, setOpen] = useState(false);
  const [idCatalog, setIdCatalog] = useState("");
  const handleOpen = (id) => {
    setIdCatalog(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="CategoryM-container">
        <div className="title">Product Category</div>
        <div className="btn-box">
          <div
            className="detele-btn"
            onClick={() => {
              console.log(ids);
            }}
          >
            Delete
          </div>
          <AddNewCategory />
        </div>
        <div className="table">
          <div className="lable">
            <div className="name">
              <Checkbox
                value="checkedA"
                checked={state.checkedA}
                onChange={handleChange("checkedA")}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              Name
            </div>
            <div className="num-product mt1">Number Of Product</div>
            <div className="action mt1">Action</div>
          </div>
          <div className="content">
            {categorys.map((item) => (
              <>
                <div className="row-category" key={item.id}>
                  <div className="name">
                    <Checkbox
                      checked={ids.includes(item.id)}
                      onChange={() => {
                        handleChangeCheck(item);
                      }}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    {item.name}
                  </div>
                  <div className="num-product">{item.numOfProducts}</div>
                  <div className="action">
                    <button
                      className="btn"
                      onClick={() => {
                        handleOpen(item.id);
                      }}
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <AddProductCatalog open={open} handleClose={handleClose} id={idCatalog} />
    </>
  );
}
export default CategoryM;
