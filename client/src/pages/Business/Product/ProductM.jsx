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
  faEye
} from "@fortawesome/free-solid-svg-icons";
import shirt from "../../../assets/shirt.jpg";
import axios from "axios";
import { api } from "../../../constant/constant";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

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
  const { tenantURL } = useParams();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [products, setProducts] = useState([]);
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / 5);

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

  const [showModal, setShowModal] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [nameDelete, setNameDelete] = useState("");
  const [sendoOrder, setSendoOrder] = useState("");

  const handleOpenModal = (id, name) => {
    setIdDelete(id);
    setNameDelete(name); // Cập nhật tên sản phẩm cần xóa
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
            handleOpenModal(row._id, row.name); // Truyền cả id và name
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        <a href={`product/edit/${row._id}`}>
          <button className="btn-icon">
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </a>
        <a href={`product/detail/${row._id}`}>
          <button className="btn-icon">
            <FontAwesomeIcon icon={faEye} />
          </button>
        </a>
      </div>
    </>
  );

  const [filter, setFilter] = useState('Active');
  const [isOrderFetched, setIsOrderFetched] = useState(false);
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  //delete product
  const handleDeleteProduct = async () => {
    console.log(idDelete);
    const deleteProduct = await axios.delete(`${api}product/${idDelete}`, config);
    if (deleteProduct.data.success) {
      console.log("Delete Product Success");
    }
    const updateArrayProduct = products.filter((n) => n._id != idDelete);
    setProducts(updateArrayProduct);
    setShowModal(false);
  };

  const sendoProduct = async () => {
    try {
      const sendo = await axios.get(`${api}product/sendo`, config);
      console.log("sendo", sendo);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const createSendoProduct = async () => {
    try {
      const sendo = await axios.get(`${api}product/create-sendo`, config);
      console.log("sendo", sendo);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const getAllProducts = async () => {
    try {
      const Products = await axios.get(`${api}product/by-tenantURL/${tenantURL}`);
      let filteredProducts = Products.data;
      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const fetchOrderSendo = async () => {
    if (isOrderFetched) return;
    try {
      const response = await axios.get(`${api}order/info`, config);
      console.log("fetchOrderSendo", response);
      const result = response.data;
      setSendoOrder(result.sku_details);
      console.log("result sendo", result.sku_details);
      setIsOrderFetched(true);
    } catch (error) {
      console.error('Error fetching orders:', error);

    }
  };

  useEffect(() => {
    sendoProduct();
    createSendoProduct();
    getAllProducts();
    console.log("re-render");
  }, []);

  useEffect(() => {
    if (!isOrderFetched) {
      fetchOrderSendo();
    }
  }, []);


  console.log(products);

  return (
    <>
      <div className="ProductM-container">
        <div className="title"> Product Management</div>
        <div className="toolkit">
          <div className="addbox">
            <a href={`/${tenantURL}/business/product/add`}>
              <button className="btn add-btn edit">Add product</button>
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
                    <TableCell align="center"
                      className="table-label"
                      sx={{ minWidth: 20 }}>
                      Image
                    </TableCell>
                    <TableCell
                      align="left"
                      className="table-label"
                      sx={{ minWidth: 100 }}
                    >
                      Name
                    </TableCell>
                    <TableCell align="left" className="table-label">
                      Variants
                    </TableCell>
                    <TableCell align="left" className="table-label">
                      Selling Price (VND)
                    </TableCell>
                    <TableCell align="left" className="table-label">
                      Quantity
                    </TableCell>
                    <TableCell align="center" className="table-label">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          <img
                            src={row.avatar ? row.avatar.picture_url : shirt}
                            style={{
                              width: "60px",
                              height: "50px",
                              borderRadius: "5px",
                            }}
                            alt=""
                          />
                        </TableCell>
                        <TableCell
                          align="left"
                          className="table-label"
                          sx={{ maxWidth: 150 }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="left" className="table-label" sx={{ maxWidth: 50 }}>
                          {row.variants && row.variants.length > 0 ? (
                            row.variants.map((variant, index) => (
                              <div key={index}>
                                {variant.variant_sku}
                              </div>
                            ))
                          ) : (
                            <div></div>
                          )}
                        </TableCell>
                        <TableCell align="left" className="table-label" sx={{ maxWidth: 10 }}>
                          <div className="flex-row">
                            {row.is_config_variant === false ? (
                              <div>{row.special_price !== null ? row.special_price : row.price}</div>
                            ) : (
                              row.variants && row.variants.length > 0 ? (
                                row.variants.map((variant, index) => (
                                  <div key={index}>
                                    {variant.variant_special_price ? variant.variant_special_price : variant.variant_price}
                                  </div>
                                ))
                              ) : (
                                <div></div>
                              )
                            )}
                          </div>
                        </TableCell>
                        <TableCell align="left" className="table-label" sx={{ maxWidth: 10 }}>
                          <div className="flex-row">
                            {row.is_config_variant === false ? (
                              <div>{row.stock_quantity}</div>
                            ) : (
                              row.variants && row.variants.length > 0 ? (
                                row.variants.map((variant, index) => (
                                  <div key={index}>
                                    {variant.variant_quantity}
                                  </div>
                                ))
                              ) : (
                                <div></div>
                              )
                            )}
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
            <div className="pages-number">{1 * (page * 5 + 1)}-{5 * (page + 1)} of {totalProducts}</div>
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
            Do you want to delete product {nameDelete} ?
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
