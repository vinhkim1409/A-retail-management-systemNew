import React, { useState } from "react";
import { Box, Button, Grid, ImageList, ImageListItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import "./UploadImg.scss";

const UploadImg = ({setImg}) => {
  var multipleFileObj = [];
  var multipleFileArray = [];

  const [multipleFile, setMultipleFile] = useState([]);

  const uploadMultipleFiles = (e) => {
    multipleFileObj.push(e.target.files);
    for (let i = 0; i < multipleFileObj[0].length; i++) {
      if(i>=6) break;
      multipleFileArray.push(URL.createObjectURL(multipleFileObj[0][i]));
    }
    setMultipleFile(multipleFileArray);
    setImg(multipleFileArray)
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
      ...multipleFileArray.slice(0, index),
      ...multipleFileArray.slice(index + 1, multipleFileArray.length),
    ]);
  };

  return (
    <>
      <form>
        <div className="Upload-container" >
          {multipleFile.length != 0 &&
            multipleFile.map((url, index) => (
              <div key={url} className="img-frame ">
                <img className="img" src={url} alt="..." />
                {console.log(index)}
              </div>
            ))}

        { multipleFile.length !=6 ? <div className="upload-button">
          <label htmlFor="upload">
            <FontAwesomeIcon
              icon={faUpload}
              className="icon"
            />
            
          </label>
          <input
            accept="image/*"
            type="file"
            name="myfile"
            id="upload"
            onChange={uploadMultipleFiles}
            multiple
            hidden
          />
        </div> :<></>}
        </div>
      </form>
    </>
  );
};

export default UploadImg;
