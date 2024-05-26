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
  TableRow,
} from "@mui/material";
import UploadImg from "../../../../components/UploadImg/UploadImg";
import SaleInfor from "../../../../components/ClassInfor/SaleInfor";
import SelecIndustry from "../../../../components/SelecIndustry/SelecIndustry";
import axios from "axios";
import { Industry } from "../../../../constant/constant";
import { useNavigate } from "react-router-dom";
import categories_level1 from "../../Data-Industry/categories_level1";
import categories_level2 from "../../Data-Industry/categories_level2";
import categories_level3 from "../../Data-Industry/categories_level3";
import { api } from "../../../../constant/constant";
import { imageDB } from "../../../../firebase/firebaseConfig";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { v4 } from "uuid";

const styles = {
  backgroundColor: "white",
};
function EditProduct() {
  const { tenantURL } = useParams();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    try {
      const Products = await axios.get(`${api}product/${id}`);
      let Product = Products.data;
      setProduct(Product);
      const arrayImg = Product.pictures.map((img) => {
        return img.picture_url;
      });
      setImg(arrayImg);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setProductCode(product.sku);
      setIPrice(product.price);
      setPPrice(product.special_price);
      setQuantity(product.stock_quantity);
      setWeight(product.weight);
      setHeight(product.height);
      setLength(product.length);
      setWidth(product.width);
      setUnit(product.unit_id);
      setFromDate(product.promotion_from_date);
      setToDate(product.promotion_to_date);
    }
  }, [product]);

  useEffect(() => {
    // Giả sử bạn có một cơ chế để xác định các biến thể ban đầu dựa trên sản phẩm, hoặc chỉ đơn giản là khởi tạo rỗng
    setVariants([
      { variant_attributes: [], variant_sku: "", variant_price: 0 },
    ]);
  }, []);

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

    // Xử lý các trường thông thường
    newVariants[index][field] = value;

    // Cập nhật variant_attributes dựa trên các lựa chọn thuộc tính
    if (field === "variant_attributes") {
      // Giả sử value là một object chứa attribute_id và option_id
      const attributeExists = newVariants[index].variant_attributes.some(
        (attr) => attr.attribute_id === value.attribute_id
      );
      if (!attributeExists) {
        newVariants[index].variant_attributes.push(value);
      } else {
        // Cập nhật option_id nếu attribute_id đã tồn tại
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

  function extractDate(dateTimeString) {
    // Chuyển chuỗi ngày tháng năm giờ thành đối tượng Date
    const date = new Date(dateTimeString);

    // Sử dụng phương thức toISOString để lấy ra phần ngày tháng năm
    const dateOnly = date.toISOString().split("T")[0];

    return dateOnly;
  }

  console.log("Selected Attributes", selectedAttributes);
  console.log("Attribute Data", attributeData);

  const handleAttributeChange = (event, index) => {
    const attribute = attributeData[index];
    const newSelectedAttributes = { ...selectedAttributes };

    const selectedOptionIds = Array.isArray(event.target.value)
      ? event.target.value.map((v) => parseInt(v))
      : [parseInt(event.target.value)];

    // Cập nhật selectedAttributes
    newSelectedAttributes[attribute.id] = {
      attribute_id: attribute.id,
      is_checkout: attribute.is_checkout === "true",
      selectedOptionIds: selectedOptionIds,
    };

    setSelectedAttributes(newSelectedAttributes);

    // Cập nhật variants để thêm variant_attributes
    selectedOptionIds.forEach((optionId) => {
      updateVariantAttributes(attribute.id, optionId);
    });
  };

  const updateVariantAttributes = (attributeId, optionId) => {
    const newVariants = [...variants];
    newVariants.forEach((variant) => {
      const attributeIndex = variant.variant_attributes.findIndex(
        (attr) => attr.attribute_id === attributeId
      );
      if (attributeIndex >= 0) {
        // Cập nhật option_id cho thuộc tính hiện có
        variant.variant_attributes[attributeIndex].option_id = optionId;
      } else {
        // Thêm thuộc tính mới nếu chưa tồn tại
        variant.variant_attributes.push({
          attribute_id: attributeId,
          option_id: optionId,
        });
      }
    });

    setVariants(newVariants);
  };

  const generateAttributeCombinations = () => {
    // Duyệt qua mỗi thuộc tính được chọn, tạo ra các kết hợp dựa trên giá trị đã chọn
    const combinations = attributeData
      .filter(
        (attr) => attr.is_checkout === "true" && selectedAttributes[attr.id]
      )
      .map((attr) => {
        return selectedAttributes[attr.id].selectedOptionIds.map((optionId) => {
          const optionDetail = attr.attribute_values.find(
            (val) => val.id === optionId
          );
          return optionDetail ? optionDetail.value : "N/A";
        });
      });

    // Tạo các kết hợp sản phẩm dựa trên các thuộc tính đã chọn
    return combinations.length
      ? combinations.reduce(
          (acc, next) => {
            return acc.flatMap((a) => next.map((n) => [...a, n]));
          },
          [[]]
        )
      : [];
  };

  const handleChangeIndustry1 = (event) => {
    setSelectedIndustry1(event.target.value);
    // Filter sub categories level 2 based on selected category level 1
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
    // Filter sub categories level 3 based on selected category level 2
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

  const attributeCombinations = generateAttributeCombinations();

  console.log("attribute Combinations", attributeCombinations);

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

  const handleChangeProduct = async () => {
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
    console.log(picture);

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
      sku: productCode,
      description: description,
      cat_4_id: selectedIndustry3,
      price: iPrice,
      special_price: pPrice,
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
      is_promotion: true,
      promotion_from_date: fromDate,
      promotion_to_date: toDate,
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

    console.log("productData", productData);

    await axios
      .put(`${api}product/${id}`, productData)
      .then((response) => {
        console.log("Product updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };
  return (
    <>
      <div className="addproduct-container">
        <div className="title">Edit Product</div>
        <div className="basic-info">
          <Paper style={{ padding: "2% 3% 3% 3%" }}>
            <Grid container spacing={0}>
              <div className="title-small"> Basic Information</div>

              <Grid container className="industry">
                <Grid container item xs={12}>
                  <Grid item xs={3.3}>
                    <Stack spacing={1}>
                      <InputLabel
                        htmlFor="title"
                        style={{ fontWeight: 600, color: "gray" }}
                      >
                        Name
                      </InputLabel>
                      <OutlinedInput
                        value={name}
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
                      <InputLabel
                        htmlFor="title"
                        style={{ fontWeight: 600, color: "gray" }}
                      >
                        Product Code
                      </InputLabel>
                      <OutlinedInput
                        value={productCode}
                        size="small"
                        style={styles}
                        sx={{ boxShadow: 3 }}
                        onChange={(e) => setProductCode(e.target.value)}
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
                      <InputLabel
                        htmlFor="title"
                        style={{ fontWeight: 600, color: "gray" }}
                      >
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

                  <Grid xs={3.3} sx={{ marginLeft: 10 }}>
                    <Stack spacing={1}>
                      <InputLabel
                        htmlFor="sub-industry"
                        style={{ fontWeight: 600, color: "gray" }}
                      >
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
                      <InputLabel
                        htmlFor="sub-industry"
                        style={{ fontWeight: 600, color: "gray" }}
                      >
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
                  <InputLabel
                    htmlFor="title"
                    style={{ fontWeight: 600, color: "#0d6efd" }}
                  >
                    Picture
                  </InputLabel>
                  <UploadImg setImg={setImg} img={img} />
                </Stack>
              </Grid>

              <Grid container item className="desc">
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="title"
                      style={{ fontWeight: 600, color: "gray" }}
                    >
                      Description
                    </InputLabel>
                    <OutlinedInput
                      value={description}
                      multiline
                      rows={4}
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Stack>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={3.3}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="title"
                      style={{ fontWeight: 600, color: "gray" }}
                    >
                      Initial Price
                    </InputLabel>
                    <OutlinedInput
                      value={iPrice}
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={(e) => setIPrice(e.target.value)}
                      error={errorName}
                    />
                    <FormHelperText error={errorName}>
                      {errorName ? "Please enter a name of product" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid xs={3.3} sx={{ marginLeft: 10 }}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="title"
                      style={{ fontWeight: 600, color: "gray" }}
                    >
                      Promotion Price
                    </InputLabel>
                    <OutlinedInput
                      value={pPrice}
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={(e) => setPPrice(e.target.value)}
                      error={errorName}
                    />
                    <FormHelperText error={errorName}>
                      {errorName ? "Please enter a name of product" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid xs={3.3}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="title"
                      style={{ fontWeight: 600, color: "gray" }}
                    >
                      Promotion From Date
                    </InputLabel>
                    <OutlinedInput
                      type="date"
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </Stack>
                </Grid>
                <Grid xs={3.3} sx={{ marginLeft: 10 }}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="title"
                      style={{ fontWeight: 600, color: "gray" }}
                    >
                      Promotion To Date
                    </InputLabel>
                    <OutlinedInput
                      type="date"
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </Stack>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={3.3}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="title"
                      style={{ fontWeight: 600, color: "gray" }}
                    >
                      Quantity
                    </InputLabel>
                    <OutlinedInput
                      value={quantity}
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={(e) => setQuantity(e.target.value)}
                      error={errorName}
                    />
                    <FormHelperText error={errorName}>
                      {errorName ? "Please enter a name of product" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid xs={3.3} sx={{ marginLeft: 10 }}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="title"
                      style={{ fontWeight: 600, color: "gray" }}
                    >
                      Weight
                    </InputLabel>
                    <OutlinedInput
                      value={weight}
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={(e) => setWeight(e.target.value)}
                      error={errorName}
                    />
                    <FormHelperText error={errorName}>
                      {errorName ? "Please enter a name of product" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid xs={3.3} sx={{ marginLeft: 10 }}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="unit"
                      style={{ fontWeight: 600, color: "gray" }}
                    >
                      Unit
                    </InputLabel>
                    <Select
                      value={unit}
                      onChange={handleChangeUnit}
                      label="Unit"
                      size="small"
                      style={{ width: "100%" }}
                      sx={{ boxShadow: 3 }}
                      displayEmpty
                    >
                      {Object.keys(labels).map((key) => (
                        <MenuItem key={key} value={key}>
                          {labels[key]}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={3.3}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="title"
                      style={{ fontWeight: 600, color: "gray" }}
                    >
                      Height
                    </InputLabel>
                    <OutlinedInput
                      value={height}
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={(e) => setHeight(e.target.value)}
                      error={errorName}
                    />
                    <FormHelperText error={errorName}>
                      {errorName ? "Please enter a name of product" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid xs={3.3} sx={{ marginLeft: 10 }}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="title"
                      style={{ fontWeight: 600, color: "gray" }}
                    >
                      Length
                    </InputLabel>
                    <OutlinedInput
                      value={length}
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={(e) => setLength(e.target.value)}
                      error={errorName}
                    />
                    <FormHelperText error={errorName}>
                      {errorName ? "Please enter a name of product" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
                <Grid xs={3.3} sx={{ marginLeft: 10 }}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="title"
                      style={{ fontWeight: 600, color: "gray" }}
                    >
                      Width
                    </InputLabel>
                    <OutlinedInput
                      value={width}
                      size="small"
                      style={styles}
                      sx={{ boxShadow: 3 }}
                      onChange={(e) => setWidth(e.target.value)}
                      error={errorName}
                    />
                    <FormHelperText error={errorName}>
                      {errorName ? "Please enter a name of product" : ""}
                    </FormHelperText>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>

        <div className="detail" style={{ display: "flex", flexWrap: "wrap" }}>
          <Paper style={{ padding: "3% 3% 3% 3%", flexGrow: 1 }}>
            <div className="title-small"> Detail Information</div>
            <Grid container spacing={4}>
              {attributeData.map(
                (attribute, index) =>
                  attribute.is_checkout === "false" && (
                    <Grid item xs={4} key={attribute.id}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor={`attribute-${attribute.id}`}>
                          {attribute.name}
                        </InputLabel>
                        <Select
                          multiple={attribute.control_type === "CheckBox"}
                          value={
                            selectedAttributes[attribute.id]
                              ?.selectedOptionIds || []
                          }
                          onChange={(event) =>
                            handleAttributeChange(event, index)
                          }
                          renderValue={(selected) =>
                            selected
                              .map(
                                (id) =>
                                  attribute.attribute_values.find(
                                    (val) => val.id === id
                                  ).value
                              )
                              .join(", ")
                          }
                        >
                          {attribute.attribute_values.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {attribute.control_type === "CheckBox" && (
                                <Checkbox
                                  checked={
                                    selectedAttributes[
                                      attribute.id
                                    ]?.selectedOptionIds.includes(option.id) ||
                                    false
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
          </Paper>
        </div>

        <div className="variants" style={{ display: "flex", flexWrap: "wrap" }}>
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
                            selectedAttributes[attribute.id]
                              ?.selectedOptionIds || []
                          }
                          onChange={(event) =>
                            handleAttributeChange(event, index)
                          }
                          renderValue={(selected) =>
                            selected
                              .map(
                                (id) =>
                                  attribute.attribute_values.find(
                                    (val) => val.id === id
                                  ).value
                              )
                              .join(", ")
                          }
                        >
                          {attribute.attribute_values.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {attribute.control_type === "CheckBox" && (
                                <Checkbox
                                  checked={
                                    selectedAttributes[
                                      attribute.id
                                    ]?.selectedOptionIds.includes(option.id) ||
                                    false
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
          </Paper>
        </div>

        <TableContainer component={Paper} className="table">
          <Table>
            <TableHead>
              <TableRow>
                {attributeData
                  .filter((attr) => attr.is_checkout === "true")
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
              {generateAttributeCombinations().map((combo, idx) => (
                <TableRow key={idx}>
                  {combo.map((value, valueIdx) => (
                    <TableCell key={valueIdx}>{value}</TableCell>
                  ))}
                  <TableCell>
                    <TextField
                      type="number"
                      onChange={(e) =>
                        handleVariantChange(
                          idx,
                          "variant_price",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      onChange={(e) =>
                        handleVariantChange(
                          idx,
                          "variant_special_price",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="date"
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
                      onChange={(e) =>
                        handleVariantChange(
                          idx,
                          "variant_quantity",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
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

        <div className="btn-add">
          <button
            className="btn-cancel"
            onClick={() => navigate(`/${tenantURL}/business/product`)}
          >
            Cancel
          </button>
          <button className="btn" onClick={handleChangeProduct}>
            Update Product
          </button>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
