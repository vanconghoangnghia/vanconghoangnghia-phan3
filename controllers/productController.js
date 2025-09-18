const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.getAll = async (req, res) => {
  try {
    let query = {};
    if (req.query.supplier) {
      query.supplierId = req.query.supplier;
    }
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }
    const products = await Product.find(query).populate('supplierId', 'name'); // Chỉ lấy 'name' từ Supplier
    const suppliers = await Supplier.find(); // For filter menu
    console.log('Products fetched:', products); // Debug dữ liệu
    res.render('products/index', { products, suppliers, search: req.query.search || '', messages: req.flash() });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplierId');
    if (!product) return res.status(404).send('Not found');
    const suppliers = await Supplier.find();
    res.render('products/form', { product, suppliers, action: 'update', title: 'Update Product', messages: req.flash() });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    req.flash('success', 'Product created!');
    res.redirect('/products');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/products');
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).send('Not found');
    req.flash('success', 'Product updated!');
    res.redirect('/products');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/products');
  }
};

exports.delete = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send('Not found');
    req.flash('success', 'Product deleted!');
    res.redirect('/products');
  } catch (err) {
    res.status(500).send(err.message);
  }
};