import React, { useState, useEffect } from "react";
import "./CustomerBlacklist.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
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

function CustomerBlackList() {
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
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 2,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 3,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 4,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 5,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 6,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 7,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 8,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
  ];
  const customerdatashopee = [
    {
      id: 1,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      reason: "Boom hànggggggggggggggg",
      status: "Bình thường",
    },
    {
      id: 2,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 3,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 4,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 5,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 6,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 7,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 8,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 9,
      lastname: "Nguyen Minh",
      firstname: "Hung1",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 10,
      lastname: "Nguyen Minh",
      firstname: "Hung2",
      email: "minhhung@gmail.commmmmmmmmmm",
      reason: "Boom hàng",
      status: "Bình thường",
    },
    {
      id: 11,
      lastname: "Nguyen Minh",
      firstname: "Hung3",
      email: "minhhung@gmail.com",
      reason: "Boom hàng",
      status: "Bình thường",
    },
  ];

  const [stateTag, setStateTag] = useState("website")

  useEffect(() => {
    setDefaultActiveTab();
  }, []);

  const setDefaultActiveTab = () => {
    const TabButton = document.querySelector(".button-website");
    TabButton.click();
  };
  const [currentTableData, setCurrentTableData] = useState(customerdatawebsite);
  const unBan = (email) => {
    console.log("unban: ", email)
  }
  const totalPages = Math.ceil(currentTableData.length / 5)
  return (
    <div className="CustomerBlackList-container">
      <h2 className="title">Blacklist</h2>
      <div className="tab">
        <button
          className={`tablinks button-website ${stateTag == "website" ? "active-tag" : ""}`}
          onClick={() => {
            setCurrentTableData(customerdatawebsite);
            setStateTag("website")
          }}
        >
          Website
        </button>
        <button
          className={`tablinks button-shopee ${stateTag == "shopee" ? "active-tag" : ""}`}
          onClick={() => {
            setCurrentTableData(customerdatashopee);
            setStateTag("shopee")
          }}
        >
          Shopee
        </button>
      </div>
      <div className="add">
        <div className="add-button">Add</div>
      </div>
      <div className="table-product">
        <Box width="100%" overflow="auto" backgroundColor="white" minHeight={450}>
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
                  align="left"
                  className="table-label"
                  sx={{ minWidth: 120 }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="left"
                  className="table-label"
                  sx={{ minWidth: 120 }}
                >
                  Lý do
                </TableCell>
                <TableCell
                  align="left"
                  className="table-label"
                  sx={{ minWidth: 100 }}
                >
                  Tình trạng
                </TableCell>
                <TableCell align="Center" className="table-label">
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
                      sx={{ maxWidth: 80 }}
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
                      align="left"
                      className="cell-content"
                      sx={{ maxWidth: 100 }}
                    >
                      {item.email}
                    </TableCell>
                    <TableCell
                      align="left"
                      className="cell-content"
                      sx={{ maxWidth: 100 }}
                    >
                      {item.reason}
                    </TableCell>
                    <TableCell align="left">{item.status}</TableCell>
                    <TableCell align="center">
                      <btn className="btn" onClick={() => { unBan(item.email) }}>
                        <FontAwesomeIcon icon={faUnlock} />
                      </btn>
                    </TableCell>
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
            <FontAwesomeIcon icon={faChevronLeft} className={`${page == 0 ? "icon-back" : "active"}`} />
          </button>
          <button
            className="button-next"
            onClick={() => handleChangePage(page + 1)}
            disabled={page == totalPages - 1}
          >
            <FontAwesomeIcon icon={faChevronRight} className={`${page == totalPages - 1 ? "icon-next" : "active"}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerBlackList;
