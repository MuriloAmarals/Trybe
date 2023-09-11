const express = require('express');
require('express-async-errors');
const cors = require('cors');
const routeLogin = require('../routes/login');
const routeRegister = require('../routes/Register');
const routeProducts = require('../routes/Products');
const routeImages = require('../routes/Images');
const routeSales = require('../routes/Sales');
const routeSalesUsers = require('../routes/SalesUsers');
const routeSalesUserById = require('../routes/SalesOrders');
const routeSaleById = require('../routes/Sales');
const routeSellerById = require('../routes/SellerByid');
const routeValidStatus = require('../routes/ValidateStatus');
const routeUsers = require('../routes/Users');
const erroHandler = require('../middlewares/error');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/login', routeLogin);
app.use('/register', routeRegister);
app.use('/customer/products', routeProducts);
app.use('/images', routeImages);
app.use('/sales', routeSales);
app.use('/catch/:role', routeSalesUsers);
app.use('/customer/orders/:userId', routeSalesUserById);
app.use('/sale/orders/:sellerId', routeSellerById);
app.use('/sale/:id', routeSaleById);
app.use('/sale/update/:id', routeValidStatus);
app.use('/users', routeUsers);
app.use(erroHandler);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
