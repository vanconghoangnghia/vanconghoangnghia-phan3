const express = require('express');
const { register, login, forgot, logout } = require('../controllers/authController');
const { ensureGuest } = require('../middleware/auth');
const router = express.Router();

// GET routes for forms
router.get('/register', ensureGuest, (req, res) => res.render('register', { messages: req.flash() }));
router.get('/login', ensureGuest, (req, res) => res.render('login', { messages: req.flash() }));
router.get('/forgot', ensureGuest, (req, res) => res.render('forgot', { messages: req.flash() }));
router.post('/register', register);
router.post('/login', login);
router.post('/forgot', forgot);
router.get('/logout', logout);

module.exports = router;