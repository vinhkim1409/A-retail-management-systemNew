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
import { faList, faCaretRight,faChevronLeft,faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ProductItem from "../../../components/ProductItem/ProductItem";
import axios from "axios";
import { api } from "../../../constant/constant";
import { useNavigate, useParams } from "react-router-dom";
const typecheckbox = ["Jacket", "Jean", "Cotons", "Excool"];

function Shop() {
  const navigate = useNavigate();
  const productsPerPage = 3;
  const productsPerRow = 5;
  const totalProducts = 50;
  const [page, setPage] = React.useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [productTable, setProductTable] = useState([]);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastProduct = (currentPage+1) * productsPerPage * productsPerRow;
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
const {tenantURL}=useParams()
  const getProduct = async () => {
    const products = await axios.get(`${api}product/by-tenantURL/${tenantURL}`);
    console.log(products.data);
    setProductTable(products.data);
    setAllProducts(products.data);
  };

  const [category, setCategory] = useState([]);
  const [categoryStatus, setCategoryStatus] = useState("All");
  const [sort, setSort] = useState(0);
  const [categoryStart, setCategoryStart] = useState(0);
  const numberRating = allProducts.reduce((total, product) => {
    return total + product.ratingCount;
  }, 0);
  const Ratingpoint =
    allProducts.reduce((total, product) => {
      return total + product.ratingPoint * product.ratingCount;
    }, 0) / numberRating;
  const [topSale, setTopSale] = useState([]);

  const getCategory = async () => {
    const category = await axios.get(`${api}category/by-tenantURL/${tenantURL}`);
    setCategory(category.data);
  };
  const getTopSale = async () => {
    const topsale = await axios.get(`${api}product/get/top-sale/${tenantURL}`);
    setTopSale(topsale.data);
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
    setSort(0);
  };
  const getLastest = () => {
    setCategoryStatus("All");
    const allproduct = [...allProducts];
    setProductTable(allproduct.reverse());
  };
  const topsale = () => {
    const topProdut = topSale.map((productID) => {
      const productget = allProducts.filter(
        (product) => product._id === productID.productId
      );
      return productget[0];
    });
    const arrayProduct=topProdut.concat(allProducts);
    const unitArrayProduct = [... new Set(arrayProduct)]
    setProductTable(unitArrayProduct)
    setCategoryStatus("All");
  };
  useEffect(() => {
    getProduct();
    getCategory();
    getTopSale();
  }, []);
  return (
    <div className="Shop-container">
      <div className="bottom-label">
        <div className="lable-business">
          <div className="title">Coolmate</div>
          <div className="name-business">Coolmate - Ho Chi Minh</div>
        </div>
        <div className="info-business">
          <div className="total-product">Product: {allProducts.length}</div>
          <div className="rating">{`Rating: ${Ratingpoint} (${numberRating} Rating) `}</div>
          {/* <div className="total-customer">{"Customer: 2"}</div> */}
        </div>
      </div>

      <div className="content">
        <div className="category">
          <div className="lable">
            <FontAwesomeIcon icon={faList} />
            Category
          </div>
          <div
            className={`${
              categoryStatus === "All"
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
              className={`${
                categoryStatus === item._id
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
              className={`${
                sort === 1
                  ? "tag-sort top-sales sort-active"
                  : "tag-sort top-sales"
              }`}
              onClick={() => {
                setSort(1);
                topsale()
              }}
            >
              {" "}
              Top Sales
            </div>
            <div
              className={`${
                sort === 2 ? "tag-sort latest sort-active" : "tag-sort latest"
              }`}
              onClick={() => {
                setSort(2);
                getLastest();
              }}
            >
              {" "}
              Lastest
            </div>
            <div
              className={`${
                sort === 3
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
              className={`${
                sort === 4
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
          <div className="pages">
          <div className="pages-number">
            {1 * (currentPage + 1)}-
            {currentPage == totalPages - 1 ? productTable.length : 5 * (currentPage + 1)} of{" "}
            {productTable.length}
          </div>
          <button
            className="button-back"
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage == 0}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={`${currentPage == 0 ? "icon-back" : "active"}`}
            />
          </button>
          <div className="number-page">{currentPage + 1}</div>
          <button
            className="button-next"
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage == totalPages - 1}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className={`${currentPage == totalPages - 1 ? "icon-next" : "active"}`}
            />
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
export default Shop;
