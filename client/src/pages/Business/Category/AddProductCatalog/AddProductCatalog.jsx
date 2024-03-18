import React, { useEffect, useState } from "react";
import "./AddProductCatalog.scss";
import { Box, Checkbox, Modal } from "@mui/material";
import axios from "axios";
import { api } from "../../../../constant/constant";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: "1px solid white",
};

const AddProductCatalog = ({ open, handleClose, id,categorys,setCategorys }) => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const newArray = [];
    setIds(newArray);
  }, [open]);
  const getProduct = async () => {
    const productList = await axios.get(`${api}product`);
    setProduct(productList.data);
  };
  useEffect(() => {
    getProduct();
  }, [open]);

  const [ids, setIds] = useState([]);
  const handleChange = () => {
    let num = 0;
    product.map((item) => {
      if (ids.includes(item._id)) {
        num = num + 1;
      }
    });
    console.log(num);
    if (num === product.length) {
      const newArray = [];
      setIds(newArray);
    } else {
      let arrayIds = [];
      product.map((item) => {
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

  const handleChooseProduct = async () => {
    const listProduct={
      product:ids
    }
    const addProduct=await axios.put(`${api}category/add-product/${id}`,listProduct)
    console.log(addProduct)
    setCategorys(categorys.map((category)=>{
      if(category._id===id){
        return {
          ...category,
          product:ids
        }
      }
      return category
    }))
    handleClose();
  };
  return (
    <div>
      <Modal open={open} disableEscapeKeyDown>
        <Box sx={style} className="Addproductcatalog-container">
          <div className="title">Add Product To Category</div>
          <div className="table">
            <div className="row">
              <div className="name lable">
                <Checkbox
                  value="checkedA"
                  checked={ids.length === product.length}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                Name
              </div>
              <div className="num-product lable">Price</div>
              <div className="quantity lable">Quantity</div>
            </div>
            <div className="content">
              {product.map((item, index) => (
                <div className="row" key={index}>
                  <div className="name">
                    <Checkbox
                      checked={ids.includes(item._id)}
                      onChange={() => {
                        handleChangeCheck(item);
                      }}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    {item.name}
                    <div className="img-product">
                      <img src={item.picture[0]} alt="" className="img" />
                    </div>
                  </div>

                  <div className="num-product">
                    {item.saleInfo[0].sellPrice}
                  </div>
                  <div className="quantity">{item.saleInfo[0].quantity}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="btn-box">
            <button className="btn cancel" onClick={handleClose}>
              Cancel
            </button>
            <button
              className="btn save"
              onClick={() => {
                handleChooseProduct();
              }}
            >
              Save change
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default AddProductCatalog;
