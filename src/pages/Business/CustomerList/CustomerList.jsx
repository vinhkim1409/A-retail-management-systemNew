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

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const customerdatawebsite = [
    {
      id: 1,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 2,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 3,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 4,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 5,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 6,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 7,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 8,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
  ];
  const customerdatashopee = [
    {
      id: 1,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 2,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 3,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 4,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 5,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 6,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 7,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 8,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 9,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 10,
      lastname: "Nguyen Minh",
      firstname: "Hung2",
      email: "minhhung@gmail.commmmmmmmmmm",
      phone: "0123456789",
      status: "Bình thường",
    },
    {
      id: 11,
      lastname: "Nguyen Minh",
      firstname: "Hung3",
      email: "minhhung@gmail.com",
      phone: "0123456789",
      status: "Bình thường",
    },
  ];
  const [stateTag, setStateTag] = useState("website");

  useEffect(() => {
    setDefaultActiveTab();
  }, []);

  const setDefaultActiveTab = () => {
    const TabButton = document.querySelector(".button-website");
    TabButton.click();
  };

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
        <div className="tab">
          <button
            className={`tablinks button-website ${
              stateTag == "website" ? "active-tag" : ""
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
              stateTag == "shopee" ? "active-tag" : ""
            }`}
            onClick={() => {
              setCurrentTableData(customerdatashopee);
              setStateTag("shopee");
            }}
          >
            Shopee
          </button>
        </div>
        <div className="table-product">
          <Box
            width="100%"
            overflow="auto"
            backgroundColor="white"
            minHeight={450}
          >
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    className="table-label"
                    sx={{ minWidth: 100 }}
                  >
                    Họ
                  </TableCell>
                  <TableCell
                    align="left"
                    className="table-label"
                    sx={{ minWidth: 60 }}
                  >
                    Tên
                  </TableCell>
                  <TableCell
                    align="center"
                    className="table-label"
                    sx={{ minWidth: 100 }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    align="left"
                    className="table-label"
                    sx={{ minWidth: 100 }}
                  >
                    Số điện thoại
                  </TableCell>
                  <TableCell
                    align="left"
                    className="table-label"
                    sx={{ minWidth: 100 }}
                  >
                    Tình trạng
                  </TableCell>
                  <TableCell align="left" className="table-label">
                    Cấm
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
                        className="table-label"
                        sx={{ maxWidth: 100 }}
                      >
                        {item.lastname}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="table-label"
                        sx={{ maxWidth: 50 }}
                      >
                        {item.firstname}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="cell-content"
                        sx={{ maxWidth: 100 }}
                      >
                        {item.email}
                      </TableCell>
                      <TableCell align="left">{item.phone}</TableCell>
                      <TableCell align="left">{item.status}</TableCell>
                      <TableCell align="left">
                        <button className="btn">
                          <FontAwesomeIcon icon={faBan} onClick={handleOpen} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </StyledTable>

            {/* <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={currentTableData.length}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ "aria-label": "Next Page" }}
            backIconButtonProps={{ "aria-label": "Previous Page" }}
          /> */}
          </Box>
          <div className="pages">
            <div className="pages-number">1-5 of {page + 1}</div>
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
