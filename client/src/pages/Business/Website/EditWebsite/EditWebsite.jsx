import React, { useEffect, useState } from "react";
import "./EditWebsite.scss";
import shirt from "../../../../assets/shirt.jpg";
import ChooseFeatProduct from "../../../../components/ChooseFeatProduct/ChooseFeatProduct";
import axios from "axios";
import { api } from "../../../../constant/constant";
function EditWebsite() {
  const [businessImgFile, setBusinessImgFile] = useState([]);

  const uploadBusinessImgFiles = async (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      if (i >= 4) {
        break;
      }
      const base64 = await readFile(files[i]);
      newImages.push(base64);
    }
    setBusinessImgFile(newImages);
  };
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const removeBusinessImage = (index) => {
    console.log("reomve");
    setBusinessImgFile([
      ...businessImgFile.slice(0, index),
      ...businessImgFile.slice(index + 1, businessImgFile.length),
    ]);
  };
  const removeBusinessImageAll = () => {
    console.log("reomve");
    setBusinessImgFile([]);
  };

  // const [featImgFile, setFeatImgFile] = useState([]);

  // const uploadFeatImgFiles = (event) => {
  //   const files = event.target.files;
  //   const newImages = [];
  //   for (let i = 0; i < files.length; i++) {
  //     if (i >= 4) {
  //       break;
  //     }
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       const base64String = reader.result;
  //       newImages.push(base64String);
  //       setFeatImgFile(newImages);
  //     };

  //     reader.readAsDataURL(files[i]);
  //   }
  // };
  // const removeFeatImage = (index) => {
  //   console.log("reomve");
  //   setFeatImgFile([
  //     ...featImgFile.slice(0, index),
  //     ...featImgFile.slice(index + 1, featImgFile.length),
  //   ]);
  // };
  // const removeFeatImageAll = () => {
  //   console.log("reomve");
  //   setFeatImgFile([]);
  // };

  // console.log(businessImgFile);
  const [featProduct, setFeatProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const removeAllProduct = () => {
    setFeatProduct([]);
  };
  const removeProduct = (index) => {
    console.log(index);
    setFeatProduct([
      ...featProduct.slice(0, index),
      ...featProduct.slice(index + 1, featProduct.length),
    ]);
  };
  const editWebsite = async () => {
    const website = {
      picture: businessImgFile,
      featProduct: featProduct,
    };
    const editRes = await axios.put(`${api}website/edit`, website);
    console.log(editRes);
  };
  const getWebsite = async () => {
    const website = await axios.get(`${api}website`);
    console.log(website.data)
    setBusinessImgFile(website.data[0]?.businessImg);
    setFeatProduct(website.data[0]?.featureProduct);
  };
  useEffect(() => {
    getWebsite();
  }, []);
  return (
    <>
      <div className="Editwebsite-container">
        <div className="title">Edit Website</div>
        <div className="img-business">
          <div className="label">
            <div className="label-business">Business Image</div>
            <div className="upload-button">
              <label htmlFor="upload-businessimg">
                <div className="upload-business">Choose Pictures</div>
              </label>
              <input
                type="file"
                name="image-business"
                accept="image/*"
                id="upload-businessimg"
                hidden
                multiple
                onChange={uploadBusinessImgFiles}
              />
            </div>
            <div className="delete-button">
              <div
                className="upload-business"
                onClick={() => {
                  removeBusinessImageAll();
                }}
              >
                Delete All
              </div>
            </div>
          </div>
          <div className="img">
            {businessImgFile.length > 0 ? (
              businessImgFile.map((url, index) => (
                <div className="img-box" key={index}>
                  <img className="img-main" src={url} alt="..." />
                  <button
                    className="detele-single"
                    onClick={() => {
                      removeBusinessImage(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* 
        <div className="product">
          <div className="label">
            <div className="label-business">Featured Product</div>
            <div className="chooseproduct-button">
              <div
                className="upload-business"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Choose Product
              </div>
            </div>

            <div className="delete-button">
              <div className="upload-business" onClick={removeAllProduct}>Delete All</div>
            </div>
          </div>
          {/* <div className="product-feat">
            {featProduct.map((item, index) => (
              <div className="feat-box">
                <div key={index} className="detail-product">
                  <div className="image-product">
                    <img
                      src={item.picture[0]}
                      // alt={`shirt ${product.id}`}
                      className="img-product"
                    />
                  </div>
                  <div className="name-product">{item.name}</div>
                  <div className="price-product">
                    ${item.saleInfo[0].sellPrice}
                  </div>
                </div>
                <button
                    className="detele-single deletefeat-box"
                    onClick={()=>{
                      removeProduct(index)
                    }}
                  >
                    Delete
                  </button>
              </div>
            ))}
          </div> }
        </div> */}
        <div className="button-box">
          <button className="btn cancle">Cancel</button>
          <button
            className="btn save"
            onClick={() => {
              editWebsite();
            }}
          >
            Save
          </button>
        </div>
      </div>
      {/* <ChooseFeatProduct
        open={open}
        handleClose={handleClose}
        setFeatProduct={setFeatProduct}
      /> */}
    </>
  );
}
export default EditWebsite;
