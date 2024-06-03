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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import UploadImg from "../../../../components/UploadImg/UploadImg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { imageDB } from "../../../../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import categories_level1 from "../../Data-Industry/categories_level1";
import categories_level2 from "../../Data-Industry/categories_level2";
import categories_level3 from "../../Data-Industry/categories_level3";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { api } from "../../../../constant/constant";

const styles = {
  backgroundColor: "white",
};

function AddProduct() {
  const { tenantURL } = useParams();
  const userBusiness = useSelector(
    (state) => state.authBusiness.login?.currentUser
  );
  const config = {
    headers: {
      Authorization: `Bearer ${userBusiness?.accessToken}`,
    },
  };

  const navigate = useNavigate();
  const labels = {
    1: "Cái",
    2: "Bộ",
    3: "Chiếc",
    4: "Đôi",
    5: "Hộp",
    6: "Cuốn",
    7: "Chai",
    8: "Thùng",
  };

  const [errorName, setErrorName] = useState(false);
  const [errorProductCode, setErrorProductCode] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorIPrice, setErrorIPrice] = useState(false);
  const [errorQuantity, setErrorQuantity] = useState(false);
  const [errorWeight, setErrorWeight] = useState(false);
  const [errorHeight, setErrorHeight] = useState(false);
  const [errorLength, setErrorLength] = useState(false);
  const [errorWidth, setErrorWidth] = useState(false);
  const [errorUnit, setErrorUnit] = useState(false);
  const [errorFromDate, setErrorFromDate] = useState(false);
  const [errorToDate, setErrorToDate] = useState(false);

  const [img, setImg] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [productCode, setProductCode] = useState("");
  const [iPrice, setIPrice] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [unit, setUnit] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    setVariants([{ variant_attributes: [], variant_sku: "", variant_price: 0 }]);
  }, []);

  const handleChangeUnit = (event) => {
    const value = event.target.value;
    setUnit(value);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    if (!newVariants[index]) {
      newVariants[index] = {
        variant_attributes: [],
        variant_sku: "",
        variant_price: 0,
        variant_promotion_start_date: "",
        variant_promotion_end_date: "",
        variant_special_price: 0,
        variant_quantity: 0,
      };
    }

    newVariants[index][field] = value;

    if (field === "variant_attributes") {
      const attributeExists = newVariants[index].variant_attributes.some(
        (attr) => attr.attribute_id === value.attribute_id
      );
      if (!attributeExists) {
        newVariants[index].variant_attributes.push(value);
      } else {
        const attributeIndex = newVariants[index].variant_attributes.findIndex(
          (attr) => attr.attribute_id === value.attribute_id
        );
        newVariants[index].variant_attributes[attributeIndex].option_id =
          value.option_id;
      }
    }

    setVariants(newVariants);
  };

  const [selectedIndustry1, setSelectedIndustry1] = useState("");
  const [selectedIndustry2, setSelectedIndustry2] = useState("");
  const [selectedIndustry3, setSelectedIndustry3] = useState("");
  const [subCategories2, setSubCategories2] = useState([]);
  const [subCategories3, setSubCategories3] = useState([]);
  const [attributeData, setAttributeData] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const handleAttributeChange = (event, index) => {
    const attribute = attributeData[index];
    const newSelectedAttributes = { ...selectedAttributes };

    let selectedOptionIds;
    if (attribute.control_type === "TextBox") {
      selectedOptionIds = [event.target.value]; // Lưu giá trị nhập vào dưới dạng mảng
    } else {
      selectedOptionIds = Array.isArray(event.target.value)
        ? event.target.value.map((v) => parseInt(v))
        : [parseInt(event.target.value)];
    }

    newSelectedAttributes[attribute.id] = {
      attribute_id: attribute.id,
      is_checkout: attribute.is_checkout === "true",
      selectedOptionIds: selectedOptionIds,
    };

    setSelectedAttributes(newSelectedAttributes);

    if (attribute.control_type !== "TextBox") {
      selectedOptionIds.forEach((optionId) => {
        updateVariantAttributes(attribute.id, optionId);
      });
    }
  };

  const updateVariantAttributes = (attributeId, optionId) => {
    const newVariants = [...variants];
    newVariants.forEach((variant) => {
      const attributeIndex = variant.variant_attributes.findIndex(
        (attr) => attr.attribute_id === attributeId
      );
      if (attributeIndex >= 0) {
        variant.variant_attributes[attributeIndex].option_id = optionId;
      } else {
        variant.variant_attributes.push({
          attribute_id: attributeId,
          option_id: optionId,
        });
      }
    });

    setVariants(newVariants);
  };

  const generateAttributeCombinations = () => {
    const selectedAttributeIds = attributeData
      .filter((attr) => attr.is_checkout === "true" && selectedAttributes[attr.id])
      .map((attr) => attr.id);

    const combinations = attributeData
      .filter((attr) => attr.is_checkout === "true" && selectedAttributes[attr.id])
      .map((attr) => {
        return selectedAttributes[attr.id].selectedOptionIds.map((optionId) => {
          const optionDetail = attr.attribute_values.find(
            (val) => val.id === optionId
          );
          return optionDetail ? optionDetail.value : "N/A";
        });
      });

    return {
      combinations: combinations.length
        ? combinations.reduce((acc, next) => {
          return acc.flatMap((a) => next.map((n) => [...a, n]));
        }, [[]])
        : [],
      selectedAttributeIds,
    };
  };

  const handleChangeIndustry1 = (event) => {
    setSelectedIndustry1(event.target.value);
    const filteredSubCategories2 = categories_level2.filter(
      (category) => category.parent_id === event.target.value
    );
    setSubCategories2(filteredSubCategories2);
    setSelectedIndustry2("");
    setSelectedIndustry3("");
    setSubCategories3([]);
  };

  const handleChangeIndustry2 = (event) => {
    setSelectedIndustry2(event.target.value);
    const filteredSubCategories3 = categories_level3.filter(
      (category) => category.parent_id === event.target.value
    );
    setSubCategories3(filteredSubCategories3);
    setSelectedIndustry3("");
  };

  const handleChangeIndustry3 = (event) => {
    setSelectedIndustry3(event.target.value);
    axios
      .get(`${api}category-info/${event.target.value}`)
      .then((response) => {
        const attributes = response.data.attributes;
        const attributeData = attributes.map((attribute) => {
          return {
            id: attribute.id,
            name: attribute.name,
            control_type: attribute.control_type,
            is_checkout: attribute.is_checkout ? "true" : "false",
            attribute_values: attribute.attribute_values.map((value) => ({
              id: value.id,
              value: value.value,
            })),
          };
        });
        setAttributeData(attributeData);
      })
      .catch((error) => {
        console.error("Error fetching attribute data:", error);
      });
  };

  const getAllCombinations = (attributes) => {
    const generateCombinations = (currentAttributes) => {
      if (currentAttributes.length === 0) return [[]];
      const [first, ...rest] = currentAttributes;
      const remainingCombinations = generateCombinations(rest);
      return first.options.flatMap((option) => {
        return remainingCombinations.map((combination) => {
          return [
            { attribute_id: first.attribute_id, option_id: option },
            ...combination,
          ];
        });
      });
    };

    return generateCombinations(attributes);
  };

  useEffect(() => {
    if (attributeData.length > 0 && selectedAttributes) {
      const attributesToCombine = attributeData
        .filter(
          (attr) => attr.is_checkout === "true" && selectedAttributes[attr.id]
        )
        .map((attr) => {
          return {
            attribute_id: attr.id,
            options: selectedAttributes[attr.id].selectedOptionIds,
          };
        });
      const variantCombinations = getAllCombinations(attributesToCombine);
      setVariants(
        variantCombinations.map((attrs) => ({
          variant_attributes: attrs,
          variant_sku: "",
          variant_price: 0,
        }))
      );
    }
  }, [attributeData, selectedAttributes]);

  const createSendoProduct = async () => {
    try {
      const sendo = await axios.get(`${api}product/create-sendo`, config);
      console.log("sendo status", sendo);
      const sendoData = sendo.data;
      const resultObject = sendoData.find(item => item.result !== undefined);
      if (resultObject !== undefined) {
        const resultId = resultObject.result;
        console.log("resultId ", resultId);
        await axios.put(`${api}product/updateId`, { newId: resultId }, config);
      } else {
        console.log('Không tìm thấy giá trị result');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async () => {
    const generatedProductCode = `${selectedIndustry3}${name}`;
    const imgArray = [];
    for (let i = 0; i < img.length; i++) {
      const imgRef = ref(imageDB, `files/${v4()}`);
      const snapshot = await uploadString(imgRef, img[i], "data_url");
      const url = await getDownloadURL(snapshot.ref);
      imgArray.push(url);
    }
    const picture = imgArray.map((img) => {
      return { picture_url: img };
    });

    const attributes = attributeData.map((attr) => {
      return {
        attribute_id: attr.id,
        attribute_is_custom: false,
        attribute_is_checkout: attr.is_checkout === "true",
        attribute_values: selectedAttributes[attr.id]
          ? selectedAttributes[attr.id].selectedOptionIds.map((valueId) => {
            const valueInfo = attr.attribute_values.find(
              (value) => value.id === valueId
            );
            return {
              id: valueId,
              value: valueInfo ? valueInfo.value : "",
              attribute_img: "string",
              is_selected: false,
              is_custom: false,
            };
          })
          : [],
      };
    });

    const hasVariants = variants.some(
      (variant) => variant.variant_attributes.length > 0
    );

    const productData = {
      id: 0,
      name: name,
      sku: generatedProductCode,
      description: description,
      cat_4_id: selectedIndustry3,
      price: iPrice,
      special_price: pPrice,
      promotion_from_date: fromDate,
      promotion_to_date: toDate,
      stock_availability: true,
      stock_quantity: quantity,
      weight: weight,
      height: height,
      length: length,
      width: width,
      unit_id: unit,
      avatar: {
        picture_url: imgArray[0],
      },
      pictures: picture,
      is_promotion: !!pPrice,
      extended_shipping_package: {
        is_using_instant: false,
        is_using_in_day: false,
        is_self_shipping: false,
        is_using_standard: true,
      },
      attributes: attributes,
      is_config_variant: hasVariants,
      variants: variants,
      voucher: {
        product_type: 1,
        is_check_date: false,
      },
    };

    if (validateForm()) {
      try {
        const response = await axios.post(
          `${api}product/add`,
          productData,
          config
        );
        console.log("Product added successfully:", response.data);
        createSendoProduct();
        navigate(`/${tenantURL}/business/product`);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
  };

  const validateForm = () => {
    let valid = true;

    if (!name) {
      setErrorName(true);
      valid = false;
    } else {
      setErrorName(false);
    }

    if (!description) {
      setErrorDescription(true);
      valid = false;
    } else {
      setErrorDescription(false);
    }

    if (!iPrice) {
      setErrorIPrice(true);
      valid = false;
    } else {
      setErrorIPrice(false);
    }

    if (!quantity) {
      setErrorQuantity(true);
      valid = false;
    } else {
      setErrorQuantity(false);
    }

    if (!weight) {
      setErrorWeight(true);
      valid = false;
    } else {
      setErrorWeight(false);
    }

    if (!height) {
      setErrorHeight(true);
      valid = false;
    } else {
      setErrorHeight(false);
    }

    if (!length) {
      setErrorLength(true);
      valid = false;
    } else {
      setErrorLength(false);
    }

    if (!width) {
      setErrorWidth(true);
      valid = false;
    } else {
      setErrorWidth(false);
    }

    if (!unit) {
      setErrorUnit(true);
      valid = false;
    } else {
      setErrorUnit(false);
    }

    if (pPrice && (!fromDate || !toDate)) {
      setErrorFromDate(!fromDate);
      setErrorToDate(!toDate);
      valid = false;
    } else {
      setErrorFromDate(false);
      setErrorToDate(false);
    }

    console.log("valid", valid);

    return valid;
  };

  const { combinations: attributeCombinations, selectedAttributeIds } = generateAttributeCombinations();

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value) setErrorName(false);
  };

  const handleProductCodeChange = (e) => {
    setProductCode(e.target.value);
    if (e.target.value) setErrorProductCode(false);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (e.target.value) setErrorDescription(false);
  };

  const handleIPriceChange = (e) => {
    setIPrice(e.target.value);
    if (e.target.value) setErrorIPrice(false);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    if (e.target.value) setErrorQuantity(false);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
    if (e.target.value) setErrorWeight(false);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
    if (e.target.value) setErrorHeight(false);
  };

  const handleLengthChange = (e) => {
    setLength(e.target.value);
    if (e.target.value) setErrorLength(false);
  };

  const handleWidthChange = (e) => {
    setWidth(e.target.value);
    if (e.target.value) setErrorWidth(false);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    if (e.target.value) setErrorUnit(false);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
    if (e.target.value) setErrorFromDate(false);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
    if (e.target.value) setErrorToDate(false);
  };

  const autoGenerateSKUs = () => {
    const newVariants = variants.map((variant) => {
      const sku = variant.variant_attributes
        .map((attr) => {
          const attribute = attributeData.find((a) => a.id === attr.attribute_id);
          const option = attribute?.attribute_values.find((o) => o.id === attr.option_id);
          return option?.value || '';
        })
        .join('_');
      return { ...variant, variant_sku: sku };
    });
    setVariants(newVariants);
  };

  const [bulkInitialPrice, setBulkInitialPrice] = useState('');
  const [bulkSalePrice, setBulkSalePrice] = useState('');
  const [bulkPromotionStartDate, setBulkPromotionStartDate] = useState('');
  const [bulkPromotionEndDate, setBulkPromotionEndDate] = useState('');
  const [bulkStock, setBulkStock] = useState('');

  const applyBulkChanges = () => {
    const newVariants = variants.map((variant) => ({
      ...variant,
      variant_price: bulkInitialPrice !== '' ? Number(bulkInitialPrice) : variant.variant_price,
      variant_special_price: bulkSalePrice !== '' ? Number(bulkSalePrice) : variant.variant_special_price,
      variant_promotion_start_date: bulkPromotionStartDate !== '' ? bulkPromotionStartDate : variant.variant_promotion_start_date,
      variant_promotion_end_date: bulkPromotionEndDate !== '' ? bulkPromotionEndDate : variant.variant_promotion_end_date,
      variant_quantity: bulkStock !== '' ? Number(bulkStock) : variant.variant_quantity,
    }));
    setVariants(newVariants);
  };

  const hasCheckoutAttribute = attributeData.some(attr => attr.is_checkout === "true");


  return (
    <>
      <div className="addproduct-container">
        <div className="title">Add Product</div>
        <div className="basic-info">
          <Paper style={{ padding: "2% 3% 3% 3%" }}>
            <Grid container spacing={0}>
              <div className="title-small"> Basic Information</div>
              <Grid container className="industry">
                <Grid container item xs={12}>
                  <Grid item xs={11.5}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="title" style={{ fontWeight: 600, color: "gray" }}>
                        Name
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        style={styles}
                        sx={{ boxShadow: 3 }}
                        onChange={handleNameChange}
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
                        style={{ width: "100%" }}
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
                  <Grid item xs={3.3} sx={{ marginLeft: 10 }}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="sub-industry" style={{ fontWeight: 600, color: "gray" }}>
                        Industry Level 2
                      </InputLabel>
                      <Select
                        value={selectedIndustry2}
                        onChange={handleChangeIndustry2}
                        placeholder="Select industry level 2"
                        size="small"
                        style={{ width: "100%" }}
                        sx={{ boxShadow: 3 }}
                        displayEmpty
                      >
                        {subCategories2.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name.split("|")[1].trim()}
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
                        style={{ width: "100%" }}
                        sx={{ boxShadow: 3 }}
                        displayEmpty
                      >
                        {subCategories3.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name.split("|")[2].trim()}
                          </MenuItem>
                        ))}
                      </Select>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="title" style={{ fontWeight: 600, color: "#0d6efd" }}>
                    Picture
                  </InputLabel>
                  <UploadImg setImg={setImg} />
                </Stack>
              </Grid>

              <Grid container item className="desc">
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="title" style={{ fontWeight: 600, color: "gray" }}>
                      Description
                    </InputLabel>
                    <OutlinedInput
                      multiline
                      rows={4}
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={handleDescriptionChange}
                      error={errorDescription}
                    />
                    <FormHelperText error={errorDescription}>
                      {errorDescription ? "Please enter a description" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={3.3}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="title" style={{ fontWeight: 600, color: "gray" }}>
                      Initial Price
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={handleIPriceChange}
                      error={errorIPrice}
                    />
                    <FormHelperText error={errorIPrice}>
                      {errorIPrice ? "Please enter an initial price" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid item xs={3.3} sx={{ marginLeft: 10 }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="title" style={{ fontWeight: 600, color: "gray" }}>
                      Promotion Price
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={(e) => setPPrice(e.target.value)}
                      error={!!pPrice && (!fromDate || !toDate)}
                    />
                    <FormHelperText error={!!pPrice && (!fromDate || !toDate)}>
                      {pPrice && (!fromDate || !toDate) ? "Please enter promotion dates" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={3.3}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="title" style={{ fontWeight: 600, color: "gray" }}>
                      Promotion From Date
                    </InputLabel>
                    <OutlinedInput
                      type="date"
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      value={fromDate}
                      onChange={handleFromDateChange}
                      error={errorFromDate}
                    />
                    <FormHelperText error={errorFromDate}>
                      {errorFromDate ? "Please enter a promotion start date" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid item xs={3.3} sx={{ marginLeft: 10 }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="title" style={{ fontWeight: 600, color: "gray" }}>
                      Promotion To Date
                    </InputLabel>
                    <OutlinedInput
                      type="date"
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      value={toDate}
                      onChange={handleToDateChange}
                      error={errorToDate}
                    />
                    <FormHelperText error={errorToDate}>
                      {errorToDate ? "Please enter a promotion end date" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={3.3}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="title" style={{ fontWeight: 600, color: "gray" }}>
                      Quantity
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={handleQuantityChange}
                      error={errorQuantity}
                    />
                    <FormHelperText error={errorQuantity}>
                      {errorQuantity ? "Please enter a quantity" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid item xs={3.3} sx={{ marginLeft: 10 }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="title" style={{ fontWeight: 600, color: "gray" }}>
                      Weight
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={handleWeightChange}
                      error={errorWeight}
                    />
                    <FormHelperText error={errorWeight}>
                      {errorWeight ? "Please enter a weight" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid item xs={3.3} sx={{ marginLeft: 10 }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="unit" style={{ fontWeight: 600, color: "gray" }}>
                      Unit
                    </InputLabel>
                    <Select
                      value={unit}
                      onChange={handleUnitChange}
                      label="Unit"
                      size="small"
                      style={{ width: "100%" }}
                      sx={{ boxShadow: 3 }}
                      displayEmpty
                      error={errorUnit}
                    >
                      {Object.keys(labels).map((key) => (
                        <MenuItem key={key} value={key}>
                          {labels[key]}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={errorUnit}>
                      {errorUnit ? "Please select a unit" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={3.3}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="title" style={{ fontWeight: 600, color: "gray" }}>
                      Height
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={handleHeightChange}
                      error={errorHeight}
                    />
                    <FormHelperText error={errorHeight}>
                      {errorHeight ? "Please enter a height" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid item xs={3.3} sx={{ marginLeft: 10 }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="title" style={{ fontWeight: 600, color: "gray" }}>
                      Length
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={handleLengthChange}
                      error={errorLength}
                    />
                    <FormHelperText error={errorLength}>
                      {errorLength ? "Please enter a length" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid item xs={3.3} sx={{ marginLeft: 10 }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="title" style={{ fontWeight: 600, color: "gray" }}>
                      Width
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={handleWidthChange}
                      error={errorWidth}
                    />
                    <FormHelperText error={errorWidth}>
                      {errorWidth ? "Please enter a width" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>

        <div className="detail" style={{ display: "flex", flexWrap: "wrap" }}>
          <Paper style={{ padding: "3% 3% 3% 3%", flexGrow: 1 }}>
            <div className="title-small">Detail Information</div>
            <Grid container spacing={4}>
              {attributeData.map(
                (attribute, index) =>
                  attribute.is_checkout === "false" && (
                    <Grid item xs={4} key={attribute.id}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor={`attribute-${attribute.id}`}>
                          {attribute.name}
                        </InputLabel>
                        {attribute.control_type === "TextBox" ? (
                          <TextField
                            value={
                              selectedAttributes[attribute.id]?.selectedOptionIds[0] || ""
                            }
                            onChange={(event) => handleAttributeChange(event, index)}
                            placeholder="Enter value"
                          />
                        ) : (
                          <Select
                            multiple={attribute.control_type === "CheckBox"}
                            value={
                              selectedAttributes[attribute.id]?.selectedOptionIds || []
                            }
                            onChange={(event) => handleAttributeChange(event, index)}
                            renderValue={(selected) =>
                              selected
                                .map(
                                  (id) =>
                                    attribute.attribute_values.find((val) => val.id === id)
                                      .value
                                )
                                .join(", ")
                            }
                          >
                            {attribute.attribute_values.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {attribute.control_type === "CheckBox" && (
                                  <Checkbox
                                    checked={
                                      selectedAttributes[attribute.id]?.selectedOptionIds.includes(
                                        option.id
                                      ) || false
                                    }
                                  />
                                )}
                                <ListItemText primary={option.value} />
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </Stack>
                    </Grid>
                  )
              )}
            </Grid>

          </Paper>
        </div>

        {hasCheckoutAttribute && (<div className="variants" style={{ display: "flex", flexWrap: "wrap" }}>
          <Paper style={{ padding: "3% 3% 3% 3%", flexGrow: 1 }}>
            <div className="title-small">Variants</div>
            <Grid container spacing={4}>
              {attributeData.map(
                (attribute, index) =>
                  attribute.is_checkout === "true" && (
                    <Grid item xs={4} key={attribute.id}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor={`attribute-${attribute.id}`}>
                          {attribute.name}
                        </InputLabel>
                        <Select
                          multiple={attribute.control_type === "CheckBox"}
                          value={
                            selectedAttributes[attribute.id]?.selectedOptionIds || []
                          }
                          onChange={(event) => handleAttributeChange(event, index)}
                          renderValue={(selected) =>
                            selected
                              .map(
                                (id) =>
                                  attribute.attribute_values.find((val) => val.id === id).value
                              )
                              .join(", ")
                          }
                        >
                          {attribute.attribute_values.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {attribute.control_type === "CheckBox" && (
                                <Checkbox
                                  checked={
                                    selectedAttributes[attribute.id]?.selectedOptionIds.includes(
                                      option.id
                                    ) || false
                                  }
                                />
                              )}
                              <ListItemText primary={option.value} />
                            </MenuItem>
                          ))}
                        </Select>
                      </Stack>
                    </Grid>
                  )
              )}
            </Grid>
            <div className="bulk-edit">
              <h3>Quick setup</h3>
              <div>
                <TextField
                  label="Initial Price"
                  type="number"
                  value={bulkInitialPrice}
                  onChange={(e) => setBulkInitialPrice(e.target.value)}
                  className="bulk-input"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Sale Price"
                  type="number"
                  value={bulkSalePrice}
                  onChange={(e) => setBulkSalePrice(e.target.value)}
                  className="bulk-input"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Promotion Start Time"
                  type="date"
                  value={bulkPromotionStartDate}
                  onChange={(e) => setBulkPromotionStartDate(e.target.value)}
                  className="bulk-input"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Promotion End Time"
                  type="date"
                  value={bulkPromotionEndDate}
                  onChange={(e) => setBulkPromotionEndDate(e.target.value)}
                  className="bulk-input"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Stock"
                  type="number"
                  value={bulkStock}
                  onChange={(e) => setBulkStock(e.target.value)}
                  className="bulk-input"
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={applyBulkChanges}
                >
                  Apply to All
                </Button>
              </div>
            </div>

            <div className="btn-generate-sku">
              <Button variant="contained" color="primary" onClick={autoGenerateSKUs}>
                Auto generate SKU
              </Button>
            </div>

            <TableContainer component={Paper} className="table">
              <Table>
                <TableHead>
                  <TableRow>
                    {attributeData
                      .filter((attr) => selectedAttributeIds.includes(attr.id))
                      .map((attr) => (
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
                      <TableCell>
                        <TextField
                          type="number"
                          value={variants[idx]?.variant_price || ''}
                          onChange={(e) =>
                            handleVariantChange(idx, "variant_price", Number(e.target.value))
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={variants[idx]?.variant_special_price || ''}
                          onChange={(e) =>
                            handleVariantChange(idx, "variant_special_price", Number(e.target.value))
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="date"
                          value={variants[idx]?.variant_promotion_start_date || ''}
                          onChange={(e) =>
                            handleVariantChange(
                              idx,
                              "variant_promotion_start_date",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="date"
                          value={variants[idx]?.variant_promotion_end_date || ''}
                          onChange={(e) =>
                            handleVariantChange(
                              idx,
                              "variant_promotion_end_date",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={variants[idx]?.variant_quantity || ''}
                          onChange={(e) =>
                            handleVariantChange(idx, "variant_quantity", Number(e.target.value))
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={variants[idx]?.variant_sku || ''}
                          onChange={(e) =>
                            handleVariantChange(idx, "variant_sku", e.target.value)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>)}


        <div className="btn-add">
          <button
            className="btn-cancel"
            onClick={() => navigate(`/${tenantURL}/business/product`)}
          >
            Cancel
          </button>
          <button className="btn" onClick={handleAddProduct}>
            Add New Product
          </button>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
