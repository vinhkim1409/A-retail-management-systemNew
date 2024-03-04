import React, { useState } from "react";
import "./Warehouse.scss";
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faMinus,
  faChevronRight,faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import shirt from "../../../assets/shirt.jpg";

function createData(pic, code, name, sell, buy, quantity) {
  return { pic, code, name, sell, buy, quantity };
}

const rows = [
  createData("Pic1", "1", "Fans", "1200000", "1000000", "10"),
  createData("Pic2", "2", "Chair", "1500000", "1000000", "10"),
  createData("Pic3", "3", "Table", "1600000", "1000000", "10"),
  createData("Pic4", "4", "Fans", "1700000", "1000000", "10"),
  createData("Pic5", "5", "Fans", "1700000", "1000000", "10"),
  createData("Pic6", "6", "Fans", "1200000", "1000000", "10"),
  createData("Pic7", "7", "Chair", "1500000", "1000000", "10"),
  createData("Pic8", "8", "Table", "1600000", "1000000", "10"),
  createData("Pic9", "9", "Fans", "1700000", "1000000", "10"),
  createData("Pic1", "10", "Fans", "1700000", "1000000", "10"),
  createData("Pic1", "11", "Fans", "1200000", "1000000", "10"),
  createData("Pic2", "12", "Chair", "1500000", "1000000", "10"),
  createData("Pic3", "13", "Table", "1600000", "1000000", "10"),
  createData("Pic4", "14", "Fans", "1700000", "1000000", "10"),
  createData("Pic5", "15", "Fans", "1700000", "1000000", "10"),
  createData("Pic6", "16", "Fans", "1200000", "1000000", "10"),
  createData("Pic7", "17", "Chair", "1500000", "1000000", "10"),
  createData("Pic8", "18", "Table", "1600000", "1000000", "10"),
  createData("Pic9", "19", "Fans", "1700000", "1000000", "10"),
  
];

const columns = [
  { id: "pic", label: "", minWidth: 150 },
  { id: "code", label: "Product code", minWidth: 150 },
  { id: "name", label: "Name", minWidth: 150 },
  { id: "sell", label: "Selling price", minWidth: 150 },
  { id: "buy", label: "Buying price", minWidth: 150 },
  { id: "quantity", label: "Quantity", minWidth: 150 },
];
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

function Warehouse() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const totalProducts = rows.length;
  const totalPages =Math.ceil(totalProducts / 5);
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const updateQuantityButton = (
    <>
      <div className="button">
        <Link to="/customer">
          <button className="btn add">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </Link>
        <Link to="/customer">
          <button className="btn minus">
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </Link>
      </div>
    </>
  );

  return (
    <div className="ware-container">
      <div className="title"> Warehouse management</div>
      <div className="toolkit">
        <div className="searchbox">
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            sx={{ borderRadius: "5px", backgroundColor: "white" }}
            //onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <button
                    className="search-button"
                    onClick={() => {
                      console.log("haha");
                    }}
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </div>
        <div className="sortbox">
          <FormControl
            sx={{
              mb: 1,
              minWidth: "245px",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            size="small"
          >
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              //value={age}
              //onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Min</MenuItem>
              <MenuItem value={20}>Max</MenuItem>
              <MenuItem value={30}>Time</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="table-product">
        <Box width="100%" overflow="auto" backgroundColor="white" minHeight={560}>
          <div className="label">
            <Typography
              sx={{
                marginLeft: 3,
                fontSize: "24px",
                fontWeight: "500",
                marginBottom: 1,
                marginTop: 3,
              }}
            >
              All Products
            </Typography>
          </div>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left"></TableCell>
                <TableCell
                  align="left"
                  className="table-label"
                  sx={{ minWidth: 100 }}
                >
                  Code
                </TableCell>
                <TableCell
                  align="left"
                  className="table-label"
                  sx={{ minWidth: 100 }}
                >
                  Name
                </TableCell>
                <TableCell align="center" className="table-label">
                  Selling Price
                </TableCell>
                <TableCell align="center" className="table-label">
                  Buying Price
                </TableCell>
                <TableCell align="center" className="table-label">
                  Quantity
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <img
                        src={shirt}
                        style={{
                          width: "60px",
                          height: "50px",
                          borderRadius: "5px",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      className="table-label"
                      sx={{ maxWidth: 100 }}
                    >
                      {row.code}
                    </TableCell>
                    <TableCell
                      align="left"
                      className="table-label"
                      sx={{ maxWidth: 80 }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.sell}</TableCell>
                    <TableCell align="center">{row.buy}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{updateQuantityButton}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>
        </Box>
        <div className="pages">
            <div className="pages-number">1-5 of {page + 1}</div>
            <button
              className="button-back"
              onClick={() => handleChangePage(page - 1)}
              disabled={page == 0}
            >
              <FontAwesomeIcon icon={faChevronLeft} className={`${page == 0?"icon-back":"active"}`} />
            </button>
            <button
              className={`button-next ${page == totalPages - 1?"":"active"}`}
              onClick={() => handleChangePage(page + 1)}
              disabled={page == totalPages - 1}
            >
              <FontAwesomeIcon icon={faChevronRight} className={`${page == totalPages - 1?"icon-next":"active"}`} />
            </button>
          </div>
      </div>
    </div>
  );
}

export default Warehouse;
