import React, { useEffect, useState } from "react";
import "./Shop.scss";
import shirt from "../../../assets/shirt.jpg";
import { Checkbox, MenuItem, OutlinedInput, Select } from "@mui/material";

const typecheckbox = ["Jacket", "Jean", "Cotons", "Excool"];
function Shop() {
  const productsPerPage = 3;
  const productsPerRow = 3;
  const totalProducts = 50;
  const [currentPage, setCurrentPage] = useState(1);

  const products = Array.from({ length: totalProducts }, (_, index) => ({
    id: index,
    name: `Coolmate Shirt ${index + 1}`,
    price: "$29",
    typ:`${index%2==0 ?"Jacket":"Jean"}`
  }));
  const [productTable,setProductTable] = useState(products)
  const indexOfLastProduct = currentPage * productsPerPage * productsPerRow;
  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage * productsPerRow;
  const currentProducts = productTable.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(
    productTable.length / (productsPerPage * productsPerRow)
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [sort, setSort] = React.useState("20");

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
  useEffect(()=>{
    if(typ.length!==0)
    {
      const newProducts=products.filter(item=>typ.includes(item.typ));
      setProductTable(newProducts)
      
      
    }
    else
    {
      setProductTable(products)
    }
  },[typ])
 

  return (
    <div className="Shop-container">
      <div className="title">Coolmate</div>
      <div className="bottom-label">
        <div className="name-business">Coolmate - Ho Chi Minh</div>
        <div className="sort">
          <div className="sort-lable">SORTING </div>
          <Select
            value={sort}
            onChange={handleChange}
            sx={{
              minWidth: 250,
              fontWeight: 600,
              "&::placeholder": { borderRadius: "10px", color: "red" },
            }}
            className="sort-box"
          >
            <MenuItem value={10}>Bestselling</MenuItem>
            <MenuItem value={20}>Newest </MenuItem>
            <MenuItem value={30}>Price Descending</MenuItem>
            <MenuItem value={40}>Price Ascending</MenuItem>
            <MenuItem value={50}>Highest Discount</MenuItem>
          </Select>
        </div>
      </div>
      <div className="content">
        <div className="filter">
          <div className="filter-type">
            <div className="lable-box">
              <div className="lable">Filters</div>
              <div className="results">
                <div className="total-product">{54} Products</div>
                {typ.length > 0 ? (
                  <div className="clear" onClick={() => { setTyp([]) }}>Clear Filter</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="type">
              <div className="type-lable">Type</div>
              <div className="checkbox-list">
                {typecheckbox.map((item, index) => (
                  <>
                    <div className="check-box" key={index}>
                      <Checkbox
                        className="check"
                        checked={typ.includes(item)}
                        onChange={() => {
                          handleChangeCheck(item);
                        }}
                      />
                      <div className="name-checkbox">{item}</div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="filter-price">
            <div className="price-lable">Price</div>
            <div className="from-box">
              <div className="name-price">From</div>
              <OutlinedInput size="small" />
            </div>
            <div className="to-box">
              <div className="name-price">To</div>
              <OutlinedInput size="small" />
            </div>
          </div>
        </div>
        <div className="product">
          <div className="list-product">
            {Array.from({ length: productsPerPage }, (_, rowIndex) => (
              <div key={rowIndex} className="row-product">
                {currentProducts
                  .slice(
                    rowIndex * productsPerRow,
                    (rowIndex + 1) * productsPerRow
                  )
                  .map((product,index) => (
                    <div key={product.id} className={`${index<2?"detail-product mr":"detail-product mr-end"}`}>
                      <div className="image-product">
                        <img
                          src={shirt}
                          alt={`shirt ${product.id}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="name-product">{product.name}</div>
                      <div className="price-product">{product.price}</div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Shop;
