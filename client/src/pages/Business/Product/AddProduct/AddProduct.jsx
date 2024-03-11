import React, { useState } from "react";
import "./AddProduct.scss";
import {
  Card,
  Checkbox,
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
import axios from "axios";
import {api} from "../../../../constant/constant"

const styles = {
  backgroundColor: "white",
};
function AddProduct() {
  const [detailInfoLabel, setDetailInfoLabel] = useState([
    "Detail1",
    "Detail2",
    "Detail3",
    "Detail4",
    "Detail5",
    "Detail6",
    "Detail7",
    "Detail8",
    "Detail9",
  ]);
  const [detailInfos, setDetailInfos] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const handleChangeDetailInfo = (event, index) => {
    const newArray = [...detailInfos];
    newArray[index] = event.target.value;
    setDetailInfos(newArray);
  };
  const [img, setImg] = useState([]);
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
  const handleAddProduct= async ()=>{

    const newProduct={
      name:basicInfo.name,
      industry:inds,
      picture:img,
      decsciption:basicInfo.decs,
      detailInfo:detailInfos.map((infoDetail,index)=>{
        return {
          name:detailInfoLabel[index],
          info:infoDetail,
          status:true
        }
      }),
      saleInfo:saleInfor
    }
    const addProductRes=await axios.post(`${api}product/add`,newProduct)
    console.log(addProductRes.data)
  }
  return (
    <>
      <div className="addproduct-container">
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
                  <UploadImg setImg={setImg} />
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
                      onChange={(event)=>{
                        setInds(event.target.value)
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
                {detailInfoLabel.map((label, index) => (
                  <Grid container item xs={4} key={index} >
                    <Stack spacing={1}>
                      <InputLabel htmlFor="title" className="detail-title">
                        {label}
                      </InputLabel>
                      <OutlinedInput
                        rows={4}
                        style={styles}
                        sx={{ boxShadow: 3 }}
                        size="small"
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
          <SaleInfor
            setTypeSale={setTypeSale}
            setSaleInfor={setSaleInfor}
          />
        </div>
        <div className="btn-add">
          <button
            className="btn"
            onClick={() => {
              // console.log(saleInfor, typeSale);
              handleAddProduct()
            }}
          >
            Add New Product
          </button>
        </div>
      </div>
      <SelecIndustry />
    </>
  );
}

export default AddProduct;
