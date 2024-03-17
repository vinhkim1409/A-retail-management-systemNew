import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./EditProduct.scss";
import {
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
} from "@mui/material";
import UploadImg from "../../../../components/UploadImg/UploadImg";
import SaleInfor from "../../../../components/ClassInfor/SaleInfor";
import SelecIndustry from "../../../../components/SelecIndustry/SelecIndustry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { api } from "../../../../constant/constant";
import EditSaleInfor from "../../../../components/EditSaleInfor/EditSaleInfor";

const styles = {
  backgroundColor: "white",
};
function EditProduct() {
  const [detailsInfo, setDetailInfos] = useState([]);
  const { id } = useParams();
  const [multipleFile, setMultipleFile] = useState([]);
  const handleChangeDetailInfo = (event, index) => {
    const newArray = detailsInfo.map((infoDetail, num) => {
      if (num === index) {
        return {
          ...infoDetail,
          info: event.target.value,
        };
      }
      return infoDetail;
    });
    setDetailInfos(newArray);
  };
  const [basicInfo, setBasicInfo] = useState({ name: "", decs: "" });
  const [errorName, setErrorName] = useState(false);
  const [inds, setInds] = useState("");
  const [typeSale, setTypeSale] = useState(0);
  const [saleInfor, setSaleInfor] = useState([]);
  const [singleInfor, setSingleInfor] = useState([]);
  const handleChangeName = (event) => {
    const value = event.target.value;
    let newBasicInfo = basicInfo;
    newBasicInfo.name = value;
    setBasicInfo(newBasicInfo);
    checkErrorName();
  };
  const checkErrorName = () => {
    if (basicInfo.name === "") {
      setErrorName(true);
    }
  };
  const handleUpdateProduct = async () => {
    const newProduct = {
      name: basicInfo.name,
      industry: inds,
      picture: multipleFile,
      decsciption: basicInfo.decs,
      detailInfo: detailsInfo.map((infoDetail, index) => {
        return {
          name: infoDetail.name,
          info: infoDetail.info,
          status: true,
        };
      }),
      saleInfo: saleInfor,
      isDeleted:false
    };
    const addProductRes = await axios.put(`${api}product/edit/${id}`, newProduct);
    console.log(addProductRes.data);
  };
  const getProduct = async () => {
    const product = await axios.get(`${api}product/${id}`);
    console.log(product.data);
    const initalBasicInfo = {
      name: product.data.name,
      decs: product.data.decsciption,
    };
    setBasicInfo(initalBasicInfo);
    const initalPicture = product.data.picture;
    setMultipleFile(initalPicture);
    setInds(product.data.industry);
    setDetailInfos(product.data.detailInfo);
   
  };
  useEffect(() => {
    getProduct();
  }, []);

  // set IMG

  const uploadMultipleFiles = async (event) => {
    console.log(event.target.files);
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      if (i >= 6) {
        break;
      }
      const base64 = await readFile(files[i]);
      newImages.push(base64);
    }
    setMultipleFile(newImages);
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
  const removeImage = (index) => {
    setMultipleFile([
      ...multipleFile.slice(0, index),
      ...multipleFile.slice(index + 1, multipleFile.length),
    ]);
  };
  return (
    <>
      <div className="editproduct-container">
        <div className="title"> Add New Product</div>
        <div className="basic-info">
          <Paper style={{ padding: "3% 3% 3% 3%" }}>
            <Grid container spacing={2}>
              <div className="title-small"> Basic Information</div>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="title"
                    style={{ fontWeight: 600, color: "#0d6efd" }}
                  >
                    Picture
                  </InputLabel>
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
                </Stack>
              </Grid>

              <Grid container item className="industry">
                <Grid container item xs={4}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="title"
                      style={{ fontWeight: 600, color: "gray" }}
                    >
                      Name
                    </InputLabel>

                    <OutlinedInput
                      size="small"
                      style={styles}
                      sx={{
                        boxShadow: 3,
                      }}
                      onChange={handleChangeName}
                      error={errorName}
                      value={basicInfo.name}
                    />
                    <FormHelperText error={errorName}>
                      {errorName ? "Please enter a name of product" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid item xs={6.7}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="title"
                      style={{ fontWeight: 600, color: "gray" }}
                    >
                      Industry
                    </InputLabel>
                    <OutlinedInput
                      placeholder="Add industry"
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      value={inds}
                      onChange={(event) => {
                        setInds(event.target.value);
                      }}
                    />
                  </Stack>
                </Grid>
              </Grid>

              <Grid container item className="desc">
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="title"
                      style={{ fontWeight: 600, color: "gray" }}
                    >
                      Decsciption
                    </InputLabel>
                    <OutlinedInput
                      multiline
                      rows={4}
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      value={basicInfo.decs}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <div className="detail">
          <Paper style={{ marginTop: "3%", padding: "3% 3% 3% 3%" }}>
            <div className="title-small"> Detail Information</div>
            <Grid container spacing={4}>
              <Grid container item spacing={5} xs={12}>
                {detailsInfo.map((info, index) => (
                  <Grid container item xs={4} key={index}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="title" className="detail-title">
                        {info.name}
                      </InputLabel>
                      <OutlinedInput
                        rows={4}
                        style={styles}
                        sx={{ boxShadow: 3 }}
                        size="small"
                        value={detailsInfo[index].info}
                        onChange={(event) => {
                          handleChangeDetailInfo(event, index);
                        }}
                      />
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Paper>
        </div>
        <div className="class-info">
          <EditSaleInfor setTypeSale={setTypeSale} setSaleInfor={setSaleInfor} />
        </div>
        <div className="btn-add">
          <button
            className="btn"
            onClick={() => {
              console.log(saleInfor);
              handleUpdateProduct();
            }}
          >
            Update Product
          </button>
        </div>
      </div>
      <SelecIndustry />
    </>
  );
}

export default EditProduct;
