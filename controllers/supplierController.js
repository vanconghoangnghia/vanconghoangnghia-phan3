const Supplier = require('../models/Supplier');

exports.getAll = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render('suppliers/index', { suppliers, messages: req.flash() });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).send('Not found');
    res.render('suppliers/form', { supplier, action: 'update', title: 'Update Supplier', messages: req.flash() });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    req.flash('success', 'Supplier created!');
    res.redirect('/suppliers');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/suppliers');
  }
};

exports.update = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!supplier) return res.status(404).send('Not found');
    req.flash('success', 'Supplier updated!');
    res.redirect('/suppliers');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/suppliers');
  }
};

exports.delete = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) return res.status(404).send('Not found');
    req.flash('success', 'Supplier deleted!');
    res.redirect('/suppliers');
  } catch (err) {
    res.status(500).send(err.message);
  }
};