import React, { useState } from "react";
import "./EditWebsite.scss";
import shirt from "../../../../assets/shirt.jpg";
function EditWebsite() {
  const [businessImgFile, setBusinessImgFile] = useState([]);

  const uploadBusinessImgFiles = (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      if (i >= 4) {
        break;
      }
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result;
        newImages.push(base64String);
        setBusinessImgFile(newImages);
      };

      reader.readAsDataURL(files[i]);
    }
   // console.log(newImages);
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

  const [featImgFile, setFeatImgFile] = useState([]);

  const uploadFeatImgFiles = (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      if (i >= 4) {
        break;
      }
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result;
        newImages.push(base64String);
        setFeatImgFile(newImages);
      };

      reader.readAsDataURL(files[i]);
    }
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
console.log(businessImgFile)
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
