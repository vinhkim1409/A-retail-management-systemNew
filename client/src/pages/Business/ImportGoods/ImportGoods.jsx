import React, { useState, useEffect } from "react";
import "./ImportGoods.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { api } from "../../../constant/constant";
import { useParams } from "react-router-dom";

function ImportGoods() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [variant_sku, setVariant_sku] = useState(null);
  const [id, setId] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const userBusiness = useSelector(
    (state) => state.authBusiness.login?.currentUser
  );
  const config = {
    headers: {
      Authorization: `Bearer ${userBusiness?.accessToken}`,
    },
  };
  const { tenantURL } = useParams();
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `${api}product/by-tenantURL/${tenantURL}`
      );
      setProducts(response.data);
      if (response.data.length > 0) {
        setId(response.data[0]._id);
        setSelectedProduct(response.data[0]); // Set selectedProduct to the first product
        if (response.data[0].variants.length > 0) {
          setVariant_sku(response.data[0].variants[0].variant_sku); // Set variant_sku to the first variant of the first product
        }
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (event) => {
    const id = event.target.value;
    setId(id);
    const selectedProduct = products.find((product) => product._id === id);
    setSelectedProduct(selectedProduct);
  };

  const handleVariantsChange = (event) => {
    const variant_sku = event.target.value;
    setVariant_sku(variant_sku);
  };

  useEffect(() => {
    if (selectedProduct && selectedProduct.variants.length > 0) {
      handleVariantsChange({
        target: { value: selectedProduct.variants[0].variant_sku },
      });
    }
  }, [selectedProduct]);

  const updateProductQuantity = () => {
    const productData = {
      id: id,
      quantity: quantity,
      variant_sku: variant_sku,
    };

    console.log("productData", productData);

    axios
      .put(`${api}product/update-quantity`, productData, config)
      .then((response) => {
        console.log("Product quantity updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating product quantity:", error);
      });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${api}/order/info`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
      console.log("result sendo", result);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="import-goods-container">
        <div className="import-goods-title">Import Goods</div>
        <div className="import-goods-form">
          <div className="import-goods-form-item">
            <label>Product</label>
            <select onChange={handleProductChange}>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="import-goods-form-item">
            <label>Variants</label>
            <select value={variant_sku} onChange={handleVariantsChange}>
              {selectedProduct &&
                selectedProduct.variants.map((variant, index) => (
                  <option key={index} value={variant.variant_sku}>
                    {variant.variant_sku}
                  </option>
                ))}
            </select>
          </div>
          <div className="import-goods-form-item">
            <label>Quantity</label>
            <input type="number" onChange={handleQuantityChange} />
          </div>
          <button onClick={updateProductQuantity}>Import</button>
        </div>
      </div>
    </>
  );
}

export default ImportGoods;
