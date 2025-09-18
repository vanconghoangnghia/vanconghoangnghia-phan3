const express = require('express');
const { getAll, getOne, create, update, delete: del } = require('../controllers/supplierController');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();

router.use(ensureAuth);
router.get('/', getAll);
router.get('/new', (req, res) => res.render('suppliers/form', { supplier: {}, action: 'create', title: 'New Supplier', messages: req.flash() }));
router.get('/:id/edit', getOne);
router.post('/', create);
router.put('/:id', update); // Đã hoạt động cho edit
router.delete('/:id', del); // Cần đảm bảo route này được kích hoạt

module.exports = router;