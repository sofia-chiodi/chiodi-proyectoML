const productServices = require('./productServices');

jest.mock('../data/db', () => {
  return {
    products: {
      findAll: jest.fn(() => mockProducts),
      findById: jest.fn((id) =>
        mockProducts.find((product) => product.id == id)
      ),
    },
  };
});

describe('productServices', () => {
  beforeEach(() => {
    mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        productImage: 'product-img.jpg',
        price: 1989,
      },
      {
        id: 2,
        name: 'Product 2',
        productImage: 'product2-img.jpg',
        price: 1900,
      },
      {
        id: 3,
        name: 'Product 3',
        productImage: 'product3-img.jpg',
        price: 2000,
      },
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('should return all products', () => {
      const result = productServices.getAllProducts();
      expect(result).toHaveLength(3);
      expect(result).toBe(mockProducts);
    });
  });

  describe('getProduct', () => {
    it('should return a specific product by ID', () => {
      const result = productServices.getProduct(mockProducts[0].id);
      expect(result).toEqual(mockProducts[0]);
    });

    it('should return undefined for a non-existent product', () => {
      const result = productServices.getProduct(999);
      expect(result).toBeUndefined();
    });
  });
});
