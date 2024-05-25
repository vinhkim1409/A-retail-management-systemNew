import React, { useEffect, useState } from "react";
import "./CategoryM.scss";
import {
  Box,
  Button,
  Checkbox,
  Modal,
  Table,
  Typography,
  styled,
} from "@mui/material";

import AddNewCategory from "../../../../components/AddNewCategory/AddNewCategory";
import AddProductCatalog from "../AddProductCatalog/AddProductCatalog";
import axios from "axios";
import { api } from "../../../../constant/constant";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 30, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 30, textTransform: "capitalize" } },
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

function CategoryM() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [ids, setIds] = useState([]);
  const handleChange = () => {
    let num = 0;
    categorys.map((item) => {
      if (ids.includes(item._id)) {
        num = num + 1;
      }
    });
    console.log(num);
    if (num === categorys.length) {
      const newArray = [];
      setIds(newArray);
    } else {
      let arrayIds = [];
      categorys.map((item) => {
        arrayIds.push(item._id);
      });
      setIds(arrayIds);
    }
  };
  const handleChangeCheck = (item) => {
    if (ids.includes(item._id)) {
      const updateIds = ids.filter((n) => n != item._id);
      setIds(updateIds);
    } else {
      setIds([...ids, item._id]);
    }
  };
  const getCatergory = async () => {
    const Category = await axios.get(`${api}category`);
    setCategorys(Category.data);
    console.log(Category)
  };

  useEffect(() => {
    getCatergory();
  }, []);
  const [categorys, setCategorys] = useState([]);
  //add products to category
  const [open, setOpen] = useState(false);
  const [idCatalog, setIdCatalog] = useState("");
  const handleOpen = (id) => {
    setIdCatalog(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleDelete = () => {
    const newArrayIds = categorys.filter((item) => !ids.includes(item.id));
    setCategorys(newArrayIds);
    setOpenDelete(false);
  };

  return (
    <>
      <div className="CategoryM-container">
        <div className="title">Product Category</div>
        <div className="btn-box">
          <button
            className={`${ids.length == 0 ? "disabled" : "delete-btn"}`}
            onClick={handleOpenDelete}
            disabled={ids.length == 0}
          >
            Delete
          </button>
          <AddNewCategory />
        </div>
        <div className="table">
          <div className="lable">
            <div className="name lable-name">
              <Checkbox
                value="checkedA"
                checked={ids.length === categorys.length}
                onChange={handleChange}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              Name
            </div>
            <div className="num-product mt1">Number Of Product</div>
            <div className="action mt1">Action</div>
          </div>
          <div className="content">
            {categorys.map((item) => (
              <>
                <div className="row-category" key={item._id}>
                  <div className="name">
                    <Checkbox
                      checked={ids.includes(item._id)}
                      onChange={() => {
                        handleChangeCheck(item);
                      }}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    {item.name}
                  </div>
                  <div className="num-product">
                    {item.product ? item.product.length : ""}
                  </div>
                  <div className="action">
                    <button
                      className="btn"
                      onClick={() => {
                        handleOpen(item._id);
                      }}
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <AddProductCatalog open={open} handleClose={handleClose} id={idCatalog} categorys={categorys} setCategorys={setCategorys} />

      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{ fontWeight: 600, fontSize: 30 }}
          >
            Delete Category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you want to delete category?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mt: "5%" }}
          >
            <Button variant="contained" onClick={handleCloseDelete}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
export default CategoryM;
