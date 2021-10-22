const express = require('express');

const app = express();

const restaurantRoute = require('./routes/restaurant')
const user_adminRoute = require('./routes/user_admin');
const userRoute = require('./routes/user');
const imageRoute = require('./routes/images');
const menuRoute = require('./routes/menu');
const pedidoRoute = require('./routes/pedido');

app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.use("/restaurants", restaurantRoute);
app.use("/user_admin", user_adminRoute);
app.use("/user", userRoute);
app.use("/images", imageRoute);
app.use("/menu", menuRoute);
app.use("/pedido", pedidoRoute);

module.exports = app