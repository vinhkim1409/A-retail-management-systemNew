import React, { useEffect, useState } from "react";
import { Box, Button, Grid, ImageList, ImageListItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import "./UploadImg.scss";

const UploadImg = ({ setImg }) => {
  const [multipleFile, setMultipleFile] = useState([]);

  const uploadMultipleFiles = (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      if (i >= 6) {
        break;
      }
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result;
        newImages.push(base64String);
        setMultipleFile(newImages);
      };

      reader.readAsDataURL(files[i]);
    }
    
  };

  // console.log(multipleFileArray?.[0]);

  // const uploadFiles = (e) => {
  //   e.preventDefault();
  //   // console.log(multipleFile);
  // };

  const removeImage = (index) => {
    // console.log("reomve");
    // console.log(index);
    setMultipleFile([
      ...multipleFile.slice(0, index),
      ...multipleFile.slice(index + 1, multipleFile.length),
    ]);
  };
  useEffect(() => {
    setImg(multipleFile);
  }, [multipleFile]);

  return (
    <>
      <form>
        <div className="Upload-container">
          {multipleFile.length != 0 &&
            multipleFile.map((url, index) => (
              <div key={url} className="img-frame ">
                <img className="img" src={url} alt="..." />
              </div>
            ))}

          {multipleFile.length != 6 ? (
            <div className="upload-button">
              <label htmlFor="upload">
                <FontAwesomeIcon icon={faUpload} className="icon" />
              </label>
              <input
                accept="image/*"
                type="file"
                name="myfile"
                id="upload"
                
                multiple
                hidden
                onChange={uploadMultipleFiles}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </form>
    </>
  );
};

export default UploadImg;
