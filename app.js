const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Khởi tạo session với debug
const sessionStore = new MongoStore({
  url: process.env.MONGODB_URI,
  autoReconnect: true,
  ttl: 14 * 24 * 60 * 60 // 14 ngày
});
sessionStore.on('error', (err) => {
  console.error('Session store error:', err);
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    httpOnly: true,
    secure: false, // Set true nếu dùng HTTPS
    maxAge: 1000 * 60 * 60 * 24 * 14 // 14 ngày
  }
}));

app.use(flash());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/suppliers', require('./routes/suppliers'));
app.use('/products', require('./routes/products'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});