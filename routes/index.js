const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const Supplier = require('../models/Supplier'); // Import model Supplier
const router = express.Router();

router.get('/', ensureAuth, async (req, res) => {
  try {
    const suppliers = await Supplier.find(); // Lấy tất cả suppliers
    const search = req.query.search || ''; // Lấy giá trị search từ query string, mặc định rỗng
    console.log('Search value:', search); // Debug: Kiểm tra giá trị search
    res.render('index', { user: req.user, messages: req.flash(), suppliers, search });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;