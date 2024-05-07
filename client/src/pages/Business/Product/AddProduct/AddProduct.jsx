import React, { useState, useEffect } from "react";
import "./AddProduct.scss";
import {
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import UploadImg from "../../../../components/UploadImg/UploadImg";
import SaleInfor from "../../../../components/ClassInfor/SaleInfor";
import SelecIndustry from "../../../../components/SelecIndustry/SelecIndustry";
import axios from "axios";
import { Industry } from "../../../../constant/constant"
import { useNavigate } from "react-router-dom";
import categories_level1 from "../../Data-Industry/categories_level1";
import categories_level2 from "../../Data-Industry/categories_level2";
import categories_level3 from "../../Data-Industry/categories_level3";

const styles = {
  backgroundColor: "white",
};
function AddProduct() {
  const navigate = useNavigate();
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

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleChangeDetailInfo = (event, index) => {
    const newArray = [...detailInfos];
    newArray[index] = event.target.value;
    setDetailInfos(newArray);
  };
  const [img, setImg] = useState([]);
  const [errorName, setErrorName] = useState(false);
  // const [inds, setInds] = useState("");
  const [typeSale, setTypeSale] = useState(0);
  const [saleInfor, setSaleInfor] = useState([]);

  const [selectedIndustry1, setSelectedIndustry1] = useState('');
  const [selectedIndustry2, setSelectedIndustry2] = useState('');
  const [selectedIndustry3, setSelectedIndustry3] = useState('');
  const [subCategories2, setSubCategories2] = useState([]);
  const [subCategories3, setSubCategories3] = useState([]);
  const [attributeData, setAttributeData] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const handleAttributeChange = (event, index) => {
    const newSelectedAttributes = [...selectedAttributes];
    if (attributeData[index].control_type === "CheckBox" && Array.isArray(event.target.value)) {
      newSelectedAttributes[index] = event.target.value;
    } else {
      newSelectedAttributes[index] = event.target.value;
    }
    setSelectedAttributes(newSelectedAttributes);
  };

  const generateAttributeCombinations = () => {
    // This will create a Cartesian product of all attribute values
    const filterAttributes = attributeData.filter(attr => attr.is_checkout === "true");
    const attributeCombos = filterAttributes.reduce((acc, attribute, idx) => {
      const newCombinations = [];
      const values = selectedAttributes[idx] || [];
      if (acc.length === 0) {
        values.forEach(value => {
          newCombinations.push([value]);
        });
      } else {
        acc.forEach(combo => {
          values.forEach(value => {
            newCombinations.push([...combo, value]);
          });
        });
      }
      return newCombinations;
    }, []);
    return attributeCombos;
  };

  const handleChangeIndustry1 = (event) => {
    setSelectedIndustry1(event.target.value);
    // Filter sub categories level 2 based on selected category level 1
    const filteredSubCategories2 = categories_level2.filter(category => category.parent_id === event.target.value);
    setSubCategories2(filteredSubCategories2);
    setSelectedIndustry2('');
    setSelectedIndustry3('');
    setSubCategories3([]);
  };

  const handleChangeIndustry2 = (event) => {
    setSelectedIndustry2(event.target.value);
    // Filter sub categories level 3 based on selected category level 2
    const filteredSubCategories3 = categories_level3.filter(category => category.parent_id === event.target.value);
    setSubCategories3(filteredSubCategories3);
    setSelectedIndustry3('');

  };

  const handleChangeIndustry3 = (event) => {
    setSelectedIndustry3(event.target.value);
    axios.get(`http://localhost:3002/category-info/${event.target.value}`)
      .then(response => {
        const attributes = response.data.attributes;
        const attributeData = attributes.map(attribute => {
          return {
            id: attribute.id,
            name: attribute.name,
            control_type: attribute.control_type,
            is_checkout: attribute.is_checkout ? "true" : "false",
            attribute_values: attribute.attribute_values.map(value => ({
              id: value.id,
              value: value.value
            }))
          };
        });
        setAttributeData(attributeData);
      })
      .catch(error => {
        console.error('Error fetching attribute data:', error);
      });
  };

  const attributeCombinations = generateAttributeCombinations();

  const handleAddProduct = () => {
    const productData = {
      name: name,
      description: description,
      // Thêm các trường dữ liệu khác nếu cần thiết
    };

    axios.post("/api/products/add", productData)
      .then(response => {
        console.log("Product added successfully:", response.data);
        // Sau khi thêm thành công, bạn có thể chuyển hướng hoặc thực hiện các hành động khác ở đây
        navigate('/products'); // Ví dụ: chuyển hướng đến trang sản phẩm
      })
      .catch(error => {
        console.error("Error adding product:", error);
      });
  };


  return (
    <>
      <div className="addproduct-container">
        <div className="title"> Add New Product</div>
        <div className="basic-info">
          <Paper style={{ padding: "2% 3% 3% 3%" }}>
            <Grid container spacing={0}>
              <div className="title-small"> Basic Information</div>

              <Grid container className="industry">
                <Grid container item xs={12}>
                  <Grid item xs={3.3}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="title" style={{ fontWeight: 600, color: "gray" }}>
                        Name
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        style={styles}
                        sx={{ boxShadow: 3 }}
                        onChange={(e) => setName(e.target.value)}
                        error={errorName}
                      />
                      <FormHelperText error={errorName}>
                        {errorName ? "Please enter a name of product" : ""}
                      </FormHelperText>
                    </Stack>
                  </Grid>
                  <Grid xs={3.3} sx={{ marginLeft: 10 }}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="title" style={{ fontWeight: 600, color: "gray" }}>
                        Product Code
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        style={styles}
                        sx={{ boxShadow: 3 }}
                        onChange={(e) => setName(e.target.value)}
                        error={errorName}
                      />
                      <FormHelperText error={errorName}>
                        {errorName ? "Please enter a name of product" : ""}
                      </FormHelperText>
                    </Stack>
                  </Grid>
                </Grid>

                <Grid container item xs={12} style={{ marginBottom: 20 }}>
                  <Grid item xs={3.3}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="title" style={{ fontWeight: 600, color: "gray" }}>
                        Industry Level 1
                      </InputLabel>
                      <Select
                        value={selectedIndustry1}
                        onChange={handleChangeIndustry1}
                        placeholder="Select industry level 1"
                        size="small"
                        style={{ width: '100%' }}
                        sx={{ boxShadow: 3 }}
                        displayEmpty
                      >
                        {categories_level1.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Stack>
                  </Grid>

                  <Grid xs={3.3} sx={{ marginLeft: 10 }}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="sub-industry" style={{ fontWeight: 600, color: "gray" }}>
                        Industry Level 2
                      </InputLabel>
                      <Select
                        value={selectedIndustry2}
                        onChange={handleChangeIndustry2}
                        placeholder="Select industry level 2"
                        size="small"
                        style={{ width: '100%' }}
                        sx={{ boxShadow: 3 }}
                        displayEmpty
                      >
                        {subCategories2.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name.split('|')[1].trim()}
                          </MenuItem>
                        ))}
                      </Select>
                    </Stack>
                  </Grid>

                  <Grid item xs={3.3} sx={{ marginLeft: 10 }}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="sub-industry" style={{ fontWeight: 600, color: "gray" }}>
                        Industry Level 3
                      </InputLabel>
                      <Select
                        value={selectedIndustry3}
                        onChange={handleChangeIndustry3}
                        placeholder="Select industry level 3"
                        size="small"
                        style={{ width: '100%' }}
                        sx={{ boxShadow: 3 }}
                        displayEmpty
                      >
                        {subCategories3.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name.split('|')[2].trim()}
                          </MenuItem>
                        ))}
                      </Select>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>

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
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>

        <div className="detail" style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Paper style={{ padding: "3% 3% 3% 3%", flexGrow: 1 }}>
            <div className="title-small"> Detail Information</div>
            <Grid container spacing={4}>
              {attributeData.map((attribute, index) => (
                attribute.is_checkout === "false" && (
                  <Grid item xs={4} key={index}>
                    <>
                      {attribute.control_type === "ComboBox" ? (
                        <Stack spacing={1}>
                          <InputLabel htmlFor={`attribute-${index}`} className="detail-title">
                            {attribute.name}
                          </InputLabel>
                          <Select
                            id={`attribute-${index}`}
                            value={selectedAttributes[index] || ''}
                            onChange={(event) => handleAttributeChange(event, index)}
                            sx={{ minWidth: 120 }}
                          >
                            {attribute.attribute_values.map((value) => (
                              <MenuItem key={value.id} value={value.value}>
                                {value.value}
                              </MenuItem>
                            ))}
                          </Select>
                        </Stack>
                      ) : attribute.control_type === "CheckBox" ? (
                        <Stack spacing={1}>
                          <InputLabel htmlFor={`attribute-${index}`} className="detail-title">
                            {attribute.name}
                          </InputLabel>
                          <Select
                            id={`attribute-${index}`}
                            multiple
                            value={selectedAttributes[index] || []}
                            onChange={(event) => handleAttributeChange(event, index)}
                            renderValue={(selected) => (
                              Array.isArray(selected) ? selected.join(', ') : ''
                            )}
                            sx={{ minWidth: 120 }}
                          >
                            {attribute.attribute_values.map((value) => (
                              <MenuItem key={value.id} value={value.value}>
                                <Checkbox checked={selectedAttributes[index]?.includes(value.value)} />
                                <ListItemText primary={value.value} />
                              </MenuItem>
                            ))}
                          </Select>
                        </Stack>
                      ) : (
                        <TextField
                          id={`attribute-${index}`}
                          label={attribute.name}
                          value={selectedAttributes[index] || ''}
                          onChange={(event) => handleAttributeChange(event, index)}
                          fullWidth
                        />
                      )}
                    </>
                  </Grid>
                )
              ))}
            </Grid>
          </Paper>
        </div>

        <div className="variants" style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Paper style={{ padding: "3% 3% 3% 3%", flexGrow: 1 }}>
            <div className="title-small">Variants</div>
            <Grid container spacing={4}>
              {attributeData.map((attribute, index) => (
                attribute.is_checkout === "true" && (
                  <Grid item xs={4} key={index}>
                    <>
                      {attribute.control_type === "ComboBox" ? (
                        <Stack spacing={1}>
                          <InputLabel htmlFor={`attribute-${index}`} className="detail-title">
                            {attribute.name}
                          </InputLabel>
                          <Select
                            id={`attribute-${index}`}
                            value={selectedAttributes[index] || ''}
                            onChange={(event) => handleAttributeChange(event, index)}
                            sx={{ minWidth: 120 }}
                          >
                            {attribute.attribute_values.map((value) => (
                              <MenuItem key={value.id} value={value.value}>
                                {value.value}
                              </MenuItem>
                            ))}
                          </Select>
                        </Stack>
                      ) : attribute.control_type === "CheckBox" ? (
                        <Stack spacing={1}>
                          <InputLabel htmlFor={`attribute-${index}`} className="detail-title">
                            {attribute.name}
                          </InputLabel>
                          <Select
                            id={`attribute-${index}`}
                            multiple
                            value={selectedAttributes[index] || []}
                            onChange={(event) => handleAttributeChange(event, index)}
                            renderValue={(selected) => (
                              Array.isArray(selected) ? selected.join(', ') : ''
                            )}
                            sx={{ minWidth: 120 }}
                          >
                            {attribute.attribute_values.map((value) => (
                              <MenuItem key={value.id} value={value.value}>
                                <Checkbox checked={selectedAttributes[index]?.includes(value.value)} />
                                <ListItemText primary={value.value} />
                              </MenuItem>
                            ))}
                          </Select>
                        </Stack>
                      ) : (
                        <TextField
                          id={`attribute-${index}`}
                          label={attribute.name}
                          value={selectedAttributes[index] || ''}
                          onChange={(event) => handleAttributeChange(event, index)}
                          fullWidth
                        />
                      )}
                    </>
                  </Grid>
                )
              ))}
            </Grid>
          </Paper>
        </div>

        <TableContainer component={Paper} className="table">
          <Table>
            <TableHead>
              <TableRow>
                {attributeData.filter(attr => attr.is_checkout === "true").map(attr => (
                  <TableCell key={attr.name}>{attr.name}</TableCell>
                ))}
                <TableCell>Initial Price</TableCell>
                <TableCell>Sale Price</TableCell>
                <TableCell>Promotion Start Time</TableCell>
                <TableCell>Promotion End Time</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>SKU</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attributeCombinations.map((combo, idx) => (
                <TableRow key={idx}>
                  {combo.map((value, valueIdx) => (
                    <TableCell key={valueIdx}>{value}</TableCell>
                  ))}
                  <TableCell><TextField type="number" /></TableCell>
                  <TableCell><TextField type="number" /></TableCell>
                  <TableCell><TextField type="date" /></TableCell>
                  <TableCell><TextField type="date" /></TableCell>
                  <TableCell><TextField type="number" /></TableCell>
                  <TableCell><TextField /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="btn-add">
          <button
            className="btn"
          // onClick={handleAddProduct}
          >
            Add New Product
          </button>
        </div>
      </div>
    </>
  );
}

export default AddProduct;