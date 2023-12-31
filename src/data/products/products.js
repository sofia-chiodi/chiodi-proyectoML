const fs = require('fs');
const path = require('path');

module.exports = {
  getProducts: function () {
    const productsPath = path.join(__dirname, './products.json');
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    return products;
  },
  findAll: function () {
    return this.getProducts();
  },
  findById: function (id) {
    const product = this.getProducts().find((product) => product.id == id);
    return product;
  },
  create: function (products) {
    const productsDBPath = path.join(__dirname, './products.json');
    fs.writeFileSync(productsDBPath, JSON.stringify(products, null, 2));
  },
};
