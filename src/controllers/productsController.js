const productServices = require('../services/productServices');

const productsController = {
  index: (req, res) => {
    const products = productServices.getAllProducts();
    res.render('products', { products });
  },
  detail: (req, res) => {
    const id = req.params.id;
    const product = productServices.getProductById(id);

    res.render('product-detail', { product });
  },
};

module.exports = productsController;
