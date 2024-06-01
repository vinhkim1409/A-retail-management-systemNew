const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Business = require("../models/businessModel");
const { default: mongoose } = require("mongoose");
const fs = require('fs');
const path = require('path');

const getLocalDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const productController = {
  accessToken: "",
  loadAccessToken: function () {
    const tokenPath = path.join(__dirname, '../token.txt');
    fs.readFile(tokenPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading access token file:', err);
        process.exit(1);
      }
      this.accessToken = data.trim();
      console.log('Access Token loaded:', this.accessToken);
    });
  },
  // fetchSendoProducts: async (req, res) => {
  //   try {
  //     const date_to = getLocalDateString();

  //     const response = await fetch('https://open.sendo.vn/api/partner/product/search', {
  //       method: 'POST',
  //       headers: {
  //         'authorization': `bearer ${productController.accessToken}`,
  //         'Content-Type': 'application/json',
  //         'cache-control': 'no-cache',
  //       },
  //       body: JSON.stringify({
  //         "page_size": 20,
  //         "product_name": "",
  //         "date_from": "2024-03-20",
  //         "date_to": date_to,
  //         "status": null,
  //         "token": ""
  //       })
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       const productIds = data.result.data.map(product => product.id);

  //       const productDetails = await Promise.all(productIds.map(async id => {
  //         const detailResponse = await fetch(`https://open.sendo.vn/api/partner/product?id=${id}`, {
  //           headers: {
  //             'Authorization': `bearer ${productController.accessToken}`
  //           }
  //         });

  //         if (detailResponse.ok) {
  //           const productDetailmain = await detailResponse.json();
  //           const productDetail = productDetailmain.result;
  //           // console.log("productDetail", productDetail);

  //           // Kiểm tra xem sản phẩm đã tồn tại trong cơ sở dữ liệu hay chưa
  //           const existingProduct = await Product.findOne({ id: productDetail.id });

  //           // Nếu sản phẩm chưa tồn tại trong cơ sở dữ liệu, thêm nó vào
  //           if (!existingProduct) {
  //             const newProduct = new Product({ tenantID: req.tenantID, ...productDetail });
  //             await newProduct.save();
  //           }

  //           return productDetail;
  //         } else {
  //           console.error('Failed to fetch product details for id:', id);
  //           return null;
  //         }
  //       }));

  //       res.json(productDetails.filter(detail => detail !== null));
  //     } else {
  //       res.status(500).json({ error: 'Failed to fetch products from Sendo', details: error.message });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: 'An error occurred while fetching products from Sendo', details: error.message });
  //   }
  // },
  fetchSendoProducts: async (req, res) => {
    try {
      const date_to = getLocalDateString();

      const response = await fetch('https://open.sendo.vn/api/partner/product/search', {
        method: 'POST',
        headers: {
          'authorization': `bearer ${productController.accessToken}`,
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
        },
        body: JSON.stringify({
          "page_size": 20,
          "product_name": "",
          "date_from": "2024-03-20",
          "date_to": date_to,
          "status": null,
          "token": ""
        })
      });

      if (response.ok) {
        const data = await response.json();
        const productIds = data.result.data.map(product => product.id);

        const productDetails = await Promise.all(productIds.map(async id => {
          // Kiểm tra xem sản phẩm đã tồn tại trong cơ sở dữ liệu hay chưa
          const existingProduct = await Product.findOne({ id: id });

          if (existingProduct) {
            return existingProduct;
          } else {
            const detailResponse = await fetch(`https://open.sendo.vn/api/partner/product?id=${id}`, {
              headers: {
                'Authorization': `bearer ${productController.accessToken}`
              }
            });

            if (detailResponse.ok) {
              const productDetailmain = await detailResponse.json();
              const productDetail = productDetailmain.result;

              const newProduct = new Product({ tenantID: req.tenantID, ...productDetail });
              await newProduct.save();

              return productDetail;
            } else {
              console.error('Failed to fetch product details for id:', id);
              return null;
            }
          }
        }));

        res.json(productDetails.filter(detail => detail !== null));
      } else {
        res.status(500).json({ error: 'Failed to fetch products from Sendo', details: error.message });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching products from Sendo', details: error.message });
    }
  },
  getByTenantURL: async (req, res) => {
    try {
      const business = await Business.find({ tenantURL: req.params.tenantURL });
      const products = await Product.find({ tenantID: business[0]._id });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getTopSale: async (req, res) => {
    try {
      const business = await Business.find({ tenantURL: req.params.tenantURL });
      const products = await Product.find({ tenantID: business[0]._id });
      const totalOrder = await Order.find({ tenantID: business[0]._id });
      const listProducts = [];
      for (let order in totalOrder) {
        for (let product in totalOrder[order].products) {
          listProducts.push(totalOrder[order].products[product]);
        }
      }
      const productCount = {};
      listProducts.forEach((product) => {
        const productId = product.product;
        if (productCount[productId]) {
          productCount[productId] += product.quantity;
        } else {
          productCount[productId] = product.quantity;
        }
      });
      const productList = Object.keys(productCount).map((productId) => ({
        productId,
        count: productCount[productId],
      }));
      productList.sort((a, b) => b.count - a.count);
      res.json(productList);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  addNewProduct: async (req, res) => {
    try {
      const productData = req.body;
      const newProduct = new Product({ tenantID: req.tenantID, ...productData });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;

      // Kiểm tra xem id có phải là ObjectId hợp lệ hay không
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const deletedProduct = await Product.findOneAndDelete({ _id: productId });

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting product", error: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateQuantity: async (req, res) => {
    const { id, quantity, variant_sku } = req.body;

    const intQuantity = parseInt(quantity);
    try {
      // const productId = mongoose.Types.ObjectId(id);
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.is_config_variant) {
        const variant = product.variants.find(
          (v) => v.variant_sku === variant_sku
        );
        if (!variant) {
          return res.status(404).json({ message: "Variant not found" });
        }
        variant.variant_quantity = variant.variant_quantity + intQuantity;
      } else {
        product.stock_quantity = product.stock_quantity + intQuantity;
      }

      await product.save();
      res.json({ message: "Product quantity updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating product quantity", error });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const updateData = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating product", error });
    }
  },
  updateProductId: async (req, res) => {
    try {
      const newId = req.body.newId;

      const product = await Product.findOne({ tenantID: req.tenantID, id: 0 });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.id = newId;
      console.log("product.id", product.id);
      await product.save();

      res.status(200).json({
        message: "Product ID updated successfully",
        product: product,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating product ID", error });
    }
  },
  createSendoProduct: async (req, res) => {
    try {
      const products = await Product.find({ tenantID: req.tenantID, id: 0 });

      const results = await Promise.all(products.map(async (product) => {
        // Convert product to plain object and remove _id from nested objects
        const productObj = product.toObject();

        // Helper function to remove _id from nested objects
        const removeNestedIds = (obj) => {
          if (Array.isArray(obj)) {
            obj.forEach(removeNestedIds);
          } else if (typeof obj === 'object' && obj !== null) {
            delete obj._id;
            Object.values(obj).forEach(removeNestedIds);
          }
        };

        const productObjWithoutId = JSON.parse(JSON.stringify(productObj));
        removeNestedIds(productObjWithoutId);

        const response = await fetch('https://open.sendo.vn/api/partner/product', {
          method: 'POST',
          headers: {
            'Authorization': `bearer ${productController.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productObj)
        });

        if (response.ok) {
          // Xóa sản phẩm khỏi MongoDB sau khi tạo thành công trên Sendo
          // await Product.findByIdAndDelete(product._id);
          return response.json();
        } else {
          const errorData = await response.json();
          console.error('Failed to create product on Sendo:', errorData);
          return { error: 'Failed to create product on Sendo', details: errorData };
        }
      }));

      res.status(201).json(results);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating products on Sendo', details: error.message });
    }
  },
  init: function () {
    this.loadAccessToken();
  }

}
productController.init();

module.exports = productController