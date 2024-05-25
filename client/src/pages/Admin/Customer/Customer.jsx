import React, { useEffect, useState } from "react";
import "./Customer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import TableDashboard from "../../../components/TableDashboard/TableDashboard";
import TagShowTotal from "../../../components/TagShowTotal/TagShowTotal";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import axios from "axios";
import { api } from "../../../constant/constant";

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      size="small"
      sx={{ borderRadius: "10px" }}
      //onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </InputAdornment>
        ),
      }}
    />
  );
};

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

function Customer() {
  const [business, setBusiness] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const totalPages = Math.ceil(business.length / 10);
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const getBusiness = async () => {
    const business = await axios.get(`${api}admin/get-business`);
    setBusiness(business.data.data);
  };
  useEffect(() => {
    getBusiness();
  }, []);
  return (
    <div className="CustomerAdmin-container">
      <div className="title">Businesses List</div>
      <div className="allbox">
        <div className="labelbox">
          <p className="textlable">All Businesses</p>
        </div>
        <div className="list-contaniner">
          <Box
            width="100%"
            overflow="auto"
            backgroundColor="white"
            minHeight={450}
          >
            <StyledTable>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <TableCell align="left" className="order-id lable-order">
                    Business Name
                  </TableCell>
                  <TableCell align="left" className="customer lable-order">
                    Phone Number
                  </TableCell>
                  <TableCell align="left" className="date lable-order">
                    Email
                  </TableCell>
                  <TableCell align="left" className="payment lable-order">
                    Location
                  </TableCell>
                  <TableCell align="left" className="total lable-order">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {business.length > 0 &&
                  business
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => (
                      <TableRow key={index} className="order-body">
                        <TableCell
                          align="left"
                          className="order-id blue"
                          sx={{ maxWidth: 173, minWidth: 140 }}
                        >
                          {item.name}
                        </TableCell>
                        <TableCell
                          align="left"
                          className="customer content-order"
                          sx={{ maxWidth: 140 }}
                        >
                          {"013456789"}
                        </TableCell>
                        <TableCell align="left" className="date content-order">
                          {item.email}
                        </TableCell>
                        <TableCell align="left" className="payment">
                          {item.location[0]}
                        </TableCell>
                        <TableCell align="left" className="total content-order">
                          {item?.package?.typePackage != 0 ? "Active" : "Preview"}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </StyledTable>
          </Box>
          <div className="pages">
            <div className="pages-number">
              {1 * (page + 1)}-
              {page == totalPages - 1 ? business.length : 5 * (page + 1)} of{" "}
              {business.length}
            </div>
            <button
              className="button-back"
              onClick={() => handleChangePage(page - 1)}
              disabled={page == 0}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={`${page == 0 ? "icon-back" : "active"}`}
              />
            </button>
            <div className="number-page">{page + 1}</div>
            <button
              className="button-next"
              onClick={() => handleChangePage(page + 1)}
              disabled={page == totalPages - 1}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className={`${page == totalPages - 1 ? "icon-next" : "active"}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
