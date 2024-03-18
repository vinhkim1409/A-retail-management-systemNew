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
import { Link } from "react-router-dom";
import shirt from "../../../assets/shirt.jpg";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {api} from "../../../constant/constant"


function createData(pic, code, name, sell, buy, quantity) {
  return { pic, code, name, sell, buy, quantity };
}

const rows = [
  createData("Pic1", "1ABCDS", "Fans", "1200000", "1000000", "10"),
  createData("Pic2", "2ABCDS", "Chair", "1500000", "1000000", "10"),
  createData("Pic3", "3ABCDS", "Table", "1600000", "1000000", "10"),
  createData("Pic4", "4ABCDS", "Fans", "1700000", "1000000", "10"),
  createData("Pic5", "5ABCDS", "Fans", "1700000", "1000000", "10"),
  createData("Pic6", "6ABCDS", "Fans", "1200000", "1000000", "10"),
  createData("Pic7", "7ABCDS", "Chair", "1500000", "1000000", "10"),
  createData("Pic8", "8ABCDS", "Table", "1600000", "1000000", "10"),
  createData(
    "Pic9",
    "9ABCDS",
    "Fans FansFansFansFans Fans",
    "1700000",
    "1000000",
    "10"
  ),
  createData("Pic1", "10ABCDS", "Fans", "1700000", "1000000", "10"),
  createData("Pic1", "11ABCDS", "Fans", "1200000", "1000000", "10"),
  createData("Pic2", "12ABCDS", "Chair", "1500000", "1000000", "10"),
  createData("Pic3", "13ABCDS", "Table", "1600000", "1000000", "10"),
  createData("Pic4", "14ABCDS", "Fans", "1700000", "1000000", "10"),
  createData("Pic5", "15ABCDS", "Fans", "1700000", "1000000", "10"),
  createData("Pic6", "16ABCDS", "Fans", "1200000", "1000000", "10"),
  createData("Pic7", "17ABCDS", "Chair", "1500000", "1000000", "10"),
  createData("Pic8", "18ABCDS", "Table", "1600000", "1000000", "10"),
  createData("Pic9", "19ABCDS", "Fans", "1700000", "1000000", "10"),
];

const columns = [
  { id: "pic", label: "", minWidth: 150 },
  { id: "code", label: "Product code", minWidth: 150 },
  { id: "name", label: "Name", minWidth: 150 },
  { id: "sell", label: "Selling price", minWidth: 150 },
  { id: "buy", label: "Buying price", minWidth: 150 },
  { id: "quantity", label: "Quantity", minWidth: 150 },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius:2,
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [products,setProducts]=useState([])
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
        <a href={`/business/product/edit/${row._id}`}  >
          <button className="btn edit">
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
         
        </a>
        
        {/* <Link to={`/business/product/detail/${row.code}`}>
          <button className="btn minus">
            <FontAwesomeIcon icon={faCircleInfo} />
          </button>
        </Link> */}
      </div>
    </>
  );
  console.log(totalPages);
        
  //delete product
  const handleDeleteProduct=async()=>{
    console.log(idDelete)
    const deleteProduct = await axios.put(
      `${api}product/delete/${idDelete}`
    );
    if(deleteProduct.data.success)
    {
      console.log("Delete Product Success")
    }
    const updateArrayProduct=products.filter((n)=>n._id!=idDelete)
    setProducts(updateArrayProduct)
    //call api xoa
    // tra ve status cua hanh dong xoa
    // notify()
    //tat popup
    setShowModal(false)

  }
  const getAllProducts=async()=>{
    const Products=await axios.get(`${api}product`);
    setProducts(Products.data)
  }
  useEffect(()=>{
    getAllProducts()
  },[])
  // const notify = () => toast.success("Delete Successfully");
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
                {products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        <img
                          src={row.picture[0]?row.picture[0]:shirt}
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
                      <TableCell align="center">{row.saleInfo[0].sellPrice}</TableCell>
                      <TableCell align="center">{row.saleInfo[0].buyPrice}</TableCell>
                      <TableCell align="center">{row.saleInfo[0].quantity}</TableCell>
                      <TableCell align="center">
                        {updateQuantityButton(row)}
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
            <Button variant="contained" color="error" onClick={()=>{
              handleDeleteProduct()}}>
              Yes
              
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ProductM;
