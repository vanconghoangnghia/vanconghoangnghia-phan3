const User = require('../models/User');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.register = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    const user = new User({ username, password, email, phone });
    await user.save();
    req.flash('success', 'Registered successfully!');
    res.redirect('/auth/login');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/auth/register');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      req.flash('error', 'Invalid credentials');
      return res.redirect('/auth/login');
    }
    req.session.userId = user._id;
    req.flash('success', 'Logged in successfully!');
    res.redirect('/');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/auth/login');
  }
};

exports.forgot = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/auth/forgot');
    }
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      text: 'Reset your password at /auth/reset (demo link)'
    });
    req.flash('success', 'Reset email sent!');
    res.redirect('/auth/login');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/auth/forgot');
  }
};

exports.logout = (req, res) => {
  if (!req.session) {
    res.redirect('/');
    return;
  }
  // Lưu flash message trước khi destroy session
  req.flash('success', 'Đã logout');
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      req.flash('error', 'Could not logout');
      res.redirect('/');
      return;
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};