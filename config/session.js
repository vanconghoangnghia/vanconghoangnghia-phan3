const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true if using https
    },
};

module.exports = session(sessionConfig);