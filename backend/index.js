
const express = require('express');
const cors = require('cors');
const productRouter = require('./router/product.router');
const connect = require('./db/connect');
const cartRouter = require('./router/cart.router');
const app = express()
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use('/', productRouter)
app.use('/', cartRouter)

connect()
    .then(() => {
        app.listen(3066, () => {
            console.log('Server listening at http://localhost:3066')
        });
    })