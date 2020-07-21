const Product = require('../models/Product');
const ErrorResponse = require('../../utils/errorResponse');

// @desc        Get all Product
// @route       GET /api/produscts
// @access      Private
exports.getAllProducts = async (req, res, next) => {
  try {
    let allProduct = await Product.find();
    if (!allProduct) {
      return next(new ErrorResponse(`No Product`, 404));
    }
    res.status(200).json(allProduct);
  } catch (err) {
    return next(new ErrorResponse(`Something Went wrong`, 500));
  }
};

// @desc        Create Product
// @route       POST /api/produscts
// @access      Private (Only Admin)

exports.createOneProduct = async (req, res, next) => {
  console.log(req.body);
  try {
    const product = {
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path
    };

    const createProduct = await Product.create(product);

    res.status(200).json({
      message: 'Product Created Successfully!',
      product: {
        name: product.name,
        price: product.price,
        productImage: product.productImage,
      },
    });
  } catch (err) {
    return next(new ErrorResponse(`Something Went wrong`, 500));
  }
};

// @desc        Get a Product by ID
// @route       GET /api/produscts/:id
// @access      Private (Only Admin)
exports.getProductById = async (req, res, next) => {
  try {
    let singleProduct = await Product.findById(req.params.id);
    if (!singleProduct) {
      return next(new ErrorResponse(`No Product`, 404));
    }
    res.status(200).json(singleProduct);
  } catch (err) {
    return next(new ErrorResponse(`Something Went wrong`, 500));
  }
};

