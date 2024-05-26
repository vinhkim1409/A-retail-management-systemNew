import React, { useEffect, useState } from "react";
import "./Shop.scss";
import {
  Checkbox,
  MenuItem,
  OutlinedInput,
  Select,
  Rating,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import ProductItem from "../../../components/ProductItem/ProductItem"
import axios from "axios";
import { api } from "../../../constant/constant";
import { useNavigate } from "react-router-dom";
const typecheckbox = ["Jacket", "Jean", "Cotons", "Excool"];

function Shop() {
  const navigate = useNavigate();
  const productsPerPage = 3;
  const productsPerRow = 5;
  const totalProducts = 50;
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productTable, setProductTable] = useState([]);

  const indexOfLastProduct = currentPage * productsPerPage * productsPerRow;
  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage * productsPerRow;
  const currentProducts = productTable?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(
    productTable?.length / (productsPerPage * productsPerRow)
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const [typ, setTyp] = useState([]);
  const handleChangeCheck = (item) => {
    if (typ.includes(item)) {
      const updateTyp = typ.filter((n) => n != item);
      setTyp(updateTyp);
    } else {
      setTyp([...typ, item]);
    }
  };
  // useEffect(()=>{
  //   if(typ.length!==0)
  //   {
  //     const newProducts=products.filter(item=>typ.includes(item.typ));
  //     setProductTable(newProducts)

  //   }
  //   else
  //   {
  //     setProductTable(products)
  //   }
  // },[typ])
  const getProduct = async () => {
    const products = await axios.get(`${api}product`);
    console.log(products.data)
    setProductTable(products.data);
    setAllProducts(products.data);
  };

  const [category, setCategory] = useState([]);
  const [categoryStatus, setCategoryStatus] = useState("All");
  const [sort, setSort] = useState(0);
  const [categoryStart, setCategoryStart] = useState(0);

  const getCategory = async () => {
    const category = await axios.get(`${api}category`);
    setCategory(category.data);
  };
  const handleChangeCategory = (id) => {
    if (id === "All") {
      setCategoryStatus("All");
      setProductTable(allProducts);
    } else {
      setCategoryStatus(id);
      const categorys = category.find((item) => item._id === id);
      const newProducts = allProducts.filter((product) =>
        categorys.product.includes(product._id)
      );
      setProductTable(newProducts);
    }
  };
  useEffect(() => {
    getProduct();
    getCategory();
  }, []);
  return (
    <div className="Shop-container">
      <div className="bottom-label">
        <div className="lable-business">
          <div className="title">Coolmate</div>
          <div className="name-business">Coolmate - Ho Chi Minh</div>
        </div>
        <div className="info-business">
          <div className="total-product">Product: 120</div>
          <div className="rating">{"Rating: 4.9 (145,2k Rating) "}</div>
          <div className="total-customer">{"Customer: 1200"}</div>
        </div>
      </div>

      <div className="content">
        <div className="category">
          <div className="lable">
            <FontAwesomeIcon icon={faList} />
            Category
          </div>
          <div
            className={`${categoryStatus === "All"
                ? "lable-category category-active"
                : "lable-category"
              }`}
            onClick={() => {
              handleChangeCategory("All");
            }}
          >
            {categoryStatus === "All" ? (
              <FontAwesomeIcon icon={faCaretRight} className="icon" />
            ) : (
              <></>
            )}
            All Products
          </div>
          {category.map((item, index) => (
            <div
              className={`${categoryStatus === item._id
                  ? "lable-category category-active non-all"
                  : "lable-category non-all"
                }`}
              onClick={() => {
                handleChangeCategory(item._id);
              }}
              key={index}
            >
              {categoryStatus === item._id ? (
                <FontAwesomeIcon icon={faCaretRight} className="icon" />
              ) : (
                <></>
              )}
              {item.name}
            </div>
          ))}
        </div>
        <div className="product">
          <div className="sort-box">
            <div className="lable-sort">Sort by</div>
            <div
              className={`${sort === 1
                  ? "tag-sort top-sales sort-active"
                  : "tag-sort top-sales"
                }`}
              onClick={() => {
                setSort(1);
              }}
            >
              {" "}
              Top Sales
            </div>
            <div
              className={`${sort === 2 ? "tag-sort latest sort-active" : "tag-sort latest"
                }`}
              onClick={() => {
                setSort(2);
              }}
            >
              {" "}
              Latest
            </div>
            <div
              className={`${sort === 3
                  ? "tag-sort price-high sort-active"
                  : "tag-sort price-high"
                }`}
              onClick={() => {
                setSort(3);
              }}
            >
              Price: High To Low
            </div>
            <div
              className={`${sort === 4
                  ? "tag-sort price-low sort-active"
                  : "tag-sort price-low"
                }`}
              onClick={() => {
                setSort(4);
              }}
            >
              Price: Low To High
            </div>
          </div>
          <div className="list-product">
            {Array.from({ length: productsPerPage }, (_, rowIndex) => (
              <div key={rowIndex} className="row-product">
                {currentProducts
                  .slice(
                    rowIndex * productsPerRow,
                    (rowIndex + 1) * productsPerRow
                  )
                  .map((product, index) => (
                    <ProductItem product={product} index={index} />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Shop;
