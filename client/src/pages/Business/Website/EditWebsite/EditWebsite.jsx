import React, { useState } from "react";
import "./EditWebsite.scss";
import shirt from "../../../../assets/shirt.jpg";
function EditWebsite() {
  let businessImg = [];
  let businessImgArray = [];
  const [businessImgFile, setBusinessImgFile] = useState([
    "https://img.itch.zone/aW1nLzQ4NDM1MTQucG5n/original/aq7izr.png",
    "https://img.itch.zone/aW1nLzQ4NDM1MTQucG5n/original/aq7izr.png",
    "https://img.itch.zone/aW1nLzQ4NDM1MTQucG5n/original/aq7izr.png",
    "https://img.itch.zone/aW1nLzQ4NDM1MTQucG5n/original/aq7izr.png",
  ]);

  const uploadBusinessImgFiles = (e) => {
    businessImg.push(e.target.files);
    for (let i = 0; i < businessImg[0].length; i++) {
      if (i >= 4) {
        break;
      }
      businessImgArray.push(URL.createObjectURL(businessImg[0][i]));
    }
    setBusinessImgFile(businessImgArray);
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

  let featImg = [];
  let featImgArray = [];
  const [featImgFile, setFeatImgFile] = useState([shirt, shirt, shirt, shirt]);

  const uploadFeatImgFiles = (e) => {
    featImg.push(e.target.files);
    for (let i = 0; i < featImg[0].length; i++) {
      if (i >= 4) {
        break;
      }
      featImgArray.push(URL.createObjectURL(featImg[0][i]));
    }
    // if (featImg[0].length > 0) {
    //   featImgArray.push(URL.createObjectURL(featImg[0][0]));
    //   console.log(featImgArray);
    // }

    setFeatImgFile(featImgArray);
  };
  const removeFeatImage = (index) => {
    console.log("reomve");
    setFeatImgFile([
      ...featImgFile.slice(0, index),
      ...featImgFile.slice(index + 1, featImgFile.length),
    ]);
  };
  const removeFeatImageAll = () => {
    console.log("reomve");
    setFeatImgFile([]);
  };

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
            {businessImgFile != 0 &&
              businessImgFile.map((url, index) => (
                <>
                  <div className="img-box">
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
                </>
              ))}
          </div>
        </div>
        <div className="product">
          <div className="label">
            <div className="label-business">Featured Product</div>
            <>
              <label htmlFor="upload-feat">
                <div className="upload-business">Choose Pictures</div>
              </label>
              <input
                type="file"
                name="image-business"
                accept="image/*"
                id="upload-feat"
                hidden
                multiple
                onChange={uploadFeatImgFiles}
              />
              <div className="delete-button">
                <div
                  className="upload-business"
                  onClick={() => {
                    removeFeatImageAll();
                  }}
                >
                  Delete All
                </div>
              </div>
            </>
          </div>
          <div className="img-feat">
            {featImgFile.length != 0 &&
              featImgFile.map((url, index) => (
                <>
                  <label htmlFor="upload-feat" className="feat-label">
                    <img className="feat-main" src={url} key={index} />
                    <div className="deletefeat-box">
                      <button
                        className="detele-single"
                        onClick={() => {
                          removeFeatImage(index);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </label>
                  {/* <input
                    type="file"
                    name="image-business"
                    accept="image/*"
                    id="upload-feat"
                    hidden
                    multiple
                    onChange={uploadFeatImgFiles}
                  /> */}
                </>
              ))}
          </div>
        </div>
        <div className="button-box">
          <button className="btn cancle">Cancel</button>
          <button className="btn save">Save</button>
        </div>
      </div>
    </>
  );
}
export default EditWebsite;
