const express = require('express');
const { getAll, getOne, create, update, delete: del } = require('../controllers/productController');
const { ensureAuth } = require('../middleware/auth');
const Supplier = require('../models/Supplier'); // Thêm import Supplier model
const router = express.Router();

router.use(ensureAuth);
router.get('/', getAll);
router.get('/new', async (req, res) => {
  try {
    const suppliers = await Supplier.find(); // Truy vấn danh sách suppliers
    res.render('products/form', { product: {}, suppliers, action: 'create', title: 'New Product', messages: req.flash() });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.get('/:id/edit', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', del);

module.exports = router;