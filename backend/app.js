const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());

const restaurantRoute = require('./routes/restaurant');
const user_adminRoute = require('./routes/user_admin');
const userRoute = require('./routes/user');
const imageRoute = require('./routes/images');
const menuRoute = require('./routes/menu');
const pedidoRoute = require('./routes/pedido');
const permissionRoute = require('./routes/permission');

app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.use("/restaurants", restaurantRoute);
app.use("/user_admin", user_adminRoute);
app.use("/user", userRoute);
app.use("/images", imageRoute);
app.use("/menu", menuRoute);
app.use("/pedido", pedidoRoute);
app.use("/permission", permissionRoute)

module.exports = app