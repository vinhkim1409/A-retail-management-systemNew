import React from "react";
import "./Customer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TableDashboard from "../../../components/TableDashboard/TableDashboard";
import TagShowTotal from "../../../components/TagShowTotal/TagShowTotal";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

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

function Customer() {
  return (
    <div className="CustomerAdmin-container">
      <div className="title">Customer List</div>
      <div className="allbox">
        <div className="labelbox">
          <p className="textlable">All Customers</p>
          <div className="searchbox">
            {/* <input type="text" className="searchinput" />
            <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
            <SearchBar />
          </div>
          <div className="sortbox">
            <FormControl sx={{ mb: 1, minWidth: 120 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                //value={age}
                label="Age"
                //onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Jane Cooper</MenuItem>
                <MenuItem value={20}>Sea food</MenuItem>
                <MenuItem value={30}>Thu Duc </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="table">
          <TableDashboard />
        </div>
      </div>
    </div>
  );
}

export default Customer;
