const User = require('../models/User');

exports.ensureAuth = async (req, res, next) => {
  if (req.session.userId) {
    try {
      req.user = await User.findById(req.session.userId);
      next();
    } catch (err) {
      res.redirect('/auth/login');
    }
  } else {
    res.redirect('/auth/login');
  }
};

exports.ensureGuest = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect('/');
  }
  next();
};