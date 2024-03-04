import React, { useState } from "react";
import "./Product.scss";
import shirt from "../../../assets/shirt.jpg";

function Product() {
    const productsPerPage = 2;
    const productsPerRow = 5;
    const totalProducts = 50;
    const [currentPage, setCurrentPage] = useState(1);

    const products = Array.from({ length: totalProducts }, (_, index) => ({
        id: index,
        name: `Coolmate Shirt ${index + 1}`,
        price: "$29",
    }));

    const indexOfLastProduct = currentPage * productsPerPage * productsPerRow;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage * productsPerRow;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(totalProducts / (productsPerPage * productsPerRow));

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="Product-container">
            <div className="title">List product in shop</div>
            <div className="name-business">Coolmate - Ho Chi Minh</div>
            <div className="list-product">
                {Array.from({ length: productsPerPage }, (_, rowIndex) => (
                    <div key={rowIndex} className="row-product">
                        {currentProducts.slice(rowIndex * productsPerRow, (rowIndex + 1) * productsPerRow).map((product) => (
                            <div key={product.id} className="detail-product">
                                <div className="image-product">
                                    <img src={shirt} alt={`shirt ${product.id}`} style={{ width: "100%", height: "80%" }} />
                                </div>
                                <div className="name-product">{product.name}</div>
                                <div className="price-product">{product.price}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    {"<"}
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
                        {index + 1}
                    </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                    {">"}
                </button>
            </div>
        </div>
    );
}

export default Product;
