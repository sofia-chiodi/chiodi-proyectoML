const productServices = require('../services/productServices');

const mainController = {
  index: (req, res) => {
    const products = productServices.getAllProducts();
    return res.render('home', { products });
  },
};

module.exports = mainController;
