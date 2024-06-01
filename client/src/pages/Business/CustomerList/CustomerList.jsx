import React, { useState, useEffect } from "react";
import "./CustomerList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios"
import {api} from "../../../constant/constant"
import { useSelector } from "react-redux";


const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

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

function CustomerList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const userBusiness = useSelector(
    (state) => state.authBusiness.login?.currentUser
  );
  const config = {
    headers: {
      Authorization: `Bearer ${userBusiness?.accessToken}`,
    },
  };
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [customerdatawebsite, setCustomerDataWebsite] = useState([]);
  const [customerdatashopee,getCustomerDataShoppe] =useState([]) 
  const [stateTag, setStateTag] = useState("website");

  const getWebsiteCustomer=async ()=>{
    const customerList= await axios.get(`${api}customer/website-business`,config)
    console.log(customerList.data.data)
    setCustomerDataWebsite(customerList.data.data)
    getCustomerDataShoppe(customerList.data.data)
    setCurrentTableData(customerList.data.data)
  }

  useEffect(() => {
    // setDefaultActiveTab();
    getWebsiteCustomer()
  }, []);

  // const setDefaultActiveTab = () => {
  //   const TabButton = document.querySelector(".button-website");
  //   TabButton.click();
  // };

  const [currentTableData, setCurrentTableData] = useState(customerdatawebsite);
  const totalPages = Math.ceil(currentTableData.length / 5);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="CustomerList-container">
        <h2 className="title">Customer List</h2>

        <div className="list-container">
          <div className="tab">
            {/* <button
              className={`tablinks button-website ${
                stateTag == "website" ? "active-tagwebsite" : ""
              }`}
              onClick={() => {
                setCurrentTableData(customerdatawebsite);
                setStateTag("website");
              }}
            >
              Website
            </button>
            <button
              className={`tablinks button-shopee ${
                stateTag == "shopee" ? "active-tagsendo" : ""
              }`}
              onClick={() => {
                setCurrentTableData(customerdatashopee);
                setStateTag("shopee");
              }}
            >
              Sendo
            </button> */}
          </div>
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
                  <TableCell
                    align="left"
                    className="customer-name lable-customer"
                  >
                    Customer
                  </TableCell>
                  <TableCell align="left" className="lastname lable-customer ">
                    Address
                  </TableCell>
                  <TableCell align="left" className="email lable-customer ">
                    Email
                  </TableCell>
                  <TableCell align="left" className="phone lable-customer ">
                    Phone
                  </TableCell>
                  <TableCell
                    align="left"
                    className="create-date lable-customer "
                  >
                    Create Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTableData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="left"
                        className="customer-name content-customer non-tranform"
                        sx={{ maxWidth: 100 }}
                      >
                        {item.firstName}{item.lastName} 
                      </TableCell>
                      <TableCell
                        align="left"
                        className="address content-customer non-tranform"
                        sx={{ maxWidth: 100 }}
                      >
                        {item.address[0]?.province?.split("//")[0]},{item.address[0]?.district?.split("//")[0]}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="email content-customer non-tranform"
                        sx={{ maxWidth: 100 }}
                      >
                        {item.email}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="phone content-customer non-tranform"
                        sx={{ maxWidth: 100 }}
                      >
                        {item.phoneNumber}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="create-date content-customer non-tranform"
                        sx={{ maxWidth: 100 }}
                      >
                        {item.createdAt?.split("T")[0]}
                      </TableCell>
                      {/* <TableCell align="left">
                        <button className="btn">
                          <FontAwesomeIcon icon={faBan} onClick={handleOpen} />
                        </button>
                      </TableCell> */}
                    </TableRow>
                  ))}
              </TableBody>
            </StyledTable>
          </Box>
          <div className="pages">
            <div className="pages-number">
              {" "}
              {1 * (page * 5 + 1)}-
              {page == totalPages - 1
                ? currentTableData.length
                : 5 * (page + 1)}{" "}
              of {currentTableData.length}
            </div>
            <button
              className="button-back"
              onClick={() => handleChangePage(page - 1)}
              disabled={page == 0}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="icon-back" />
            </button>
            <button
              className="button-next"
              onClick={() => handleChangePage(page + 1)}
              disabled={page == totalPages - 1}
            >
              <FontAwesomeIcon icon={faChevronRight} className="icon-next" />
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{ fontWeight: 600, fontSize: 30 }}
          >
            Ban customer
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you want to ban this customer ?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mt: "5%" }}
          >
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="error">
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default CustomerList;
