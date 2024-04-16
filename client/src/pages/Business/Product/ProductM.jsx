import React, { useEffect, useState } from "react";
import "./ProductM.scss";
import {
  Box,
  Button,
  InputAdornment,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPenToSquare,
  faTrashCan,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import shirt from "../../../assets/shirt.jpg";
import axios from "axios";
import { api } from "../../../constant/constant";

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

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

function ProductM() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [products, setProducts] = useState([]);
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / 5);
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [showModal, setShowModal] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const handleOpenModal = (id) => {
    setIdDelete(id);
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const updateQuantityButton = (row) => (
    <>
      <div className="button">
        <button
          className="trash"
          onClick={() => {
            handleOpenModal(row._id);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        <a href={`/business/product/edit/${row._id}`}>
          <button className="btn edit">
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </a>
      </div>
    </>
  );

  //delete product
  const handleDeleteProduct = async () => {
    console.log(idDelete);
    const deleteProduct = await axios.put(`${api}product/delete/${idDelete}`);
    if (deleteProduct.data.success) {
      console.log("Delete Product Success");
    }
    const updateArrayProduct = products.filter((n) => n._id != idDelete);
    setProducts(updateArrayProduct);
    setShowModal(false);
  };
  const getAllProducts = async () => {
    const Products = await axios.get(`${api}product`);
    setProducts(Products.data);
    setLoading(false);
  };
  useEffect(() => {
    getAllProducts();
    console.log("re-render");
  }, []);
  return (
    <>
      <div className="ProductM-container">
        <div className="title"> Product Management</div>
        <div className="toolkit">
          <div className="searchbox">
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              sx={{ mb: 1, borderRadius: "5px", backgroundColor: "white" }}
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
          <div className="addbox">
            <a href="/business/product/add">
              <button className="btn add-btn">Add product</button>
            </a>
          </div>
        </div>
        <div className="table-product">
          <Box
            width="100%"
            overflow="auto"
            backgroundColor="white"
            minHeight={560}
          >
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
            {!loading ? (
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <div
                        style={{
                          width: "60px",
                        }}
                      ></div>
                    </TableCell>
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
                    <TableCell align="left" className="table-label">
                      Selling Price
                    </TableCell>
                    <TableCell align="left" className="table-label">
                      Buying Price
                    </TableCell>
                    <TableCell align="left" className="table-label">
                      Quantity
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          <img
                            src={row.picture[0] ? row.picture[0] : shirt}
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
                          ABCS123
                        </TableCell>
                        <TableCell
                          align="left"
                          className="table-label"
                          sx={{ maxWidth: 80 }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="left">
                          <div className="saleInfo">
                            {row.saleInfo.map((sale, index) => (
                              <div
                                className={`${
                                  index === 0 ? "salefirst" : "sale"
                                }`}
                                key={index}
                              >
                                {new Intl.NumberFormat('en-US').format(sale.sellPrice)} VND
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <div className="saleInfo">
                            {row.saleInfo.map((sale, index) => (
                              <div
                                className={`${
                                  index === 0 ? "salefirst" : "sale"
                                }`}
                                key={index}
                              >
                                {new Intl.NumberFormat('en-US').format(sale.buyPrice)} VND
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <div className="saleInfo">
                            {row.saleInfo.map((sale, index) => (
                              <div
                                className={`${
                                  index === 0 ? "salefirst" : "sale"
                                }`}
                                key={index}
                              >
                                {new Intl.NumberFormat('en-US').format(sale.quantity)} 
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          {updateQuantityButton(row)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </StyledTable>
            ) : (
              <div className="loading">
                <span className="loader"></span>
              </div>
            )}
          </Box>
          <div className="pages">
            <div className="pages-number">{1*(page*5+1)}-{5*(page+1)} of {totalProducts + 1}</div>
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
            <div className="number-page">{page+1}</div>
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
        open={showModal}
        onClose={handleClose}
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
            Do you want to delete product {idDelete} ?
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
                handleDeleteProduct();
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ProductM;
