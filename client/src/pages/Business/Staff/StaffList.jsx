import React, { useState, useEffect } from "react";
import "./StaffList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
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
  Snackbar,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
import AddNewStaff from "../../../components/AddNewStaff/AddNewStaff/AddNewStaff";
import EditStaff from "../../../components/EditStaff/EditStaff";
import axios from "axios";
import { api } from "../../../constant/constant";

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
  p: 4,
};

function StaffList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState("");

  const userBusiness = useSelector(
    (state) => state.authBusiness.login?.currentUser
  );
  const config = {
    headers: {
      Authorization: `Bearer ${userBusiness?.accessToken}`,
    },
  };

  const openEditStaff = async (email) => {
    setEmailEdit(email);
  };
  const operationButton = (item) => (
    <div className="button">
      <button
        className="trash"
        onClick={() => {
          handleOpenModal(item);
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
      <button
        className="btn"
        onClick={() => {
          openEditStaff(item.email);
          setOpenEdit(true);
        }}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    </div>
  );
  const [stafflist, setStaffList] = useState([]);

  const getAll = async () => {
    const staff = await axios.get(`${api}staff`, config);
    console.log(staff.data);
    setStaffList(staff.data);
  };
  useEffect(() => {
    getAll();
  }, []);
  const totalpage = Math.ceil(stafflist.length / rowsPerPage);

  //delete staff
  const [showModal, setShowModal] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const handleOpenModal = (item) => {
    setIdDelete(item);
    setShowModal(true);
  };

  const deleteStaff = async () => {
    const responseDeleted = await axios.put(
      `${api}staff/delete/${idDelete.email}`,
      idDelete.email,
      config
    );
    if (responseDeleted.data.success) {
      const newStaffArray = stafflist.filter(
        (staff) => staff.email != idDelete.email
      );
      setStaffList(newStaffArray);
    }
    else{
      setError(responseDeleted.data.data)
      setOpenWrongConfirm(true)
    }
    handleClose();
  };
  const handleClose = () => {
    setShowModal(false);
  };
  //error
  const [openWrongCofirm, setOpenWrongConfirm] = useState(false);
  const [error,setError]=useState("")
  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWrongConfirm(false);
  };

  return (
    <>
      <div className="StaffList-container">
        <div className="header">
          <div className="title">Staff List</div>
        </div>
        <div className="list-container">
          <div className="tool">
            <div className="position-sort">
              <div className="lable-position-sort">Status</div>
              <select
                name="selectStatusShipp"
                id=""
                // value={activeTab}
                // onChange={handleTabClick}
                className="select-status-box"
              >
                <option value="All">All</option>
                <option value="Admin">Admin</option>
                <option value="Saler">Saler</option>
              </select>
            </div>
            <div className="add">
              <AddNewStaff stafflist={stafflist} setStaffList={setStaffList} />
            </div>
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
                    className="first-name table-label "
                    sx={{ minWidth: 100 }}
                  >
                    First Name
                  </TableCell>
                  <TableCell
                    align="left"
                    className="last-name table-label"
                    sx={{ minWidth: 80 }}
                  >
                    Last Name
                  </TableCell>
                  <TableCell
                    align="left"
                    className="email table-label"
                    sx={{ minWidth: 120 }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    align="left"
                    className="phone table-label"
                    sx={{ minWidth: 120 }}
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    align="left"
                    className="position table-label"
                    sx={{ minWidth: 120 }}
                  >
                    Position
                  </TableCell>
                  <TableCell align="center" className="table-label"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stafflist
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="left"
                        className="first-name table-label non-tranform"
                        sx={{ maxWidth: 80 }}
                      >
                        {item.lastname}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="last-name table-label non-tranform"
                        sx={{ maxWidth: 50 }}
                      >
                        {item.firstname}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="email cell-content non-tranform"
                        sx={{ maxWidth: 100 }}
                      >
                        {item.email}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="phone cell-content non-tranform"
                        sx={{ maxWidth: 100 }}
                      >
                        {item.phoneNumber}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="position cell-content non-tranform"
                        sx={{ maxWidth: 100 }}
                      >
                        {item.position}
                      </TableCell>
                      <TableCell align="center">
                        {operationButton(item)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </StyledTable>
          </Box>
          <div className="pages">
            <div className="pages-number">
              {" "}
              {1 * (page * 5 + 1)}-
              {page == totalpage - 1 ? stafflist.length : 5 * (page + 1)} of{" "}
              {stafflist.length}
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
              disabled={page == totalpage - 1}
            >
              <FontAwesomeIcon icon={faChevronRight} className="icon-next" />
            </button>
          </div>
        </div>
      </div>

      {emailEdit ? (
        <EditStaff
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          emailEdit={emailEdit}
          setEmailEdit={setEmailEdit}
          stafflist={stafflist}
          setStaffList={setStaffList}
        />
      ) : (
        <></>
      )}

      <Modal
        open={showModal}
        disableEscapeKeyDown
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{ fontWeight: 600, fontSize: 30 }}
          >
            Delete Product
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you want to delete staff{" "}
            {idDelete ? `${idDelete.firstname} ${idDelete.lastname}` : ``} ?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mt: "5%" }}
          >
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteStaff();
                handleClose();
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openWrongCofirm}
        autoHideDuration={2000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}!!
        </Alert>
      </Snackbar>
    </>
  );
}

export default StaffList;
