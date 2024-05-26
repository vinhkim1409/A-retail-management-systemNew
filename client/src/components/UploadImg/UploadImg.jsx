import React, { useEffect, useState } from "react";
import { Box, Button, Grid, ImageList, ImageListItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./UploadImg.scss";

const UploadImg = ({ setImg, img }) => {
  const [multipleFile, setMultipleFile] = useState([]);
  const [check1x1, setCheck1x1] = useState([]);
  const uploadMultipleFiles = async (event) => {
    console.log(event.target.files);
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      if (i >= 5 - multipleFile.lenght) {
        break;
      }
      const base64 = await readFile(files[i]);
      newImages.push(base64);
    }
    setMultipleFile([...multipleFile, ...newImages]);

    const imagePromises = Array.from(files).map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const image = new Image();
          image.src = event.target.result;

          image.onload = () => {
            resolve({ width: image.width, height: image.height });
          };
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((dimensions) => {
      const newCheck = [];
      dimensions.map((dim) => {
        if (dim.width === dim.height) {
          newCheck.push(true);
        } else {
          newCheck.push(false);
        }
      });
      setCheck1x1([...check1x1, ...newCheck]);
    });
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
  const handleDeleteImg = (index) => {
    setMultipleFile([
      ...multipleFile.slice(0, index),
      ...multipleFile.slice(index + 1, multipleFile.length),
    ]);
    setCheck1x1([
      ...check1x1.slice(0, index),
      ...check1x1.slice(index + 1, check1x1.length),
    ]);
  };
  useEffect(() => {
    setImg(multipleFile);
  }, [multipleFile]);
  return (
    <>
      <form>
        <div
          onClick={() => {
            console.log(check1x1);
          }}
        ></div>
        <div className="Upload-container">
          {multipleFile.length != 0 &&
            multipleFile.map((url, index) => (
              <div key={url} className="img-frame ">
                <span class="close" onClick={() => handleDeleteImg(index)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
                <img className="img" src={url} alt="..." />
              </div>
            ))}

          {multipleFile.length != 5 ? (
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
