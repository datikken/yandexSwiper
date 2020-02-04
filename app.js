var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
//routes
var shopRoutes = require('./routes/shop');
//init
var app = express();
//templates
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//routes
app.use(shopRoutes);

app.listen(3000);