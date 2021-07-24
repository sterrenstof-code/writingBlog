const express = require('express')
var app = express();
const path = require('path');
const nunjucks = require('nunjucks');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const port = 3000;
const mongoose = require('mongoose');
const Product = require('./models/products');

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log("connected");
})
.catch((err) => {
  console.log("something went wrong: " + err);
})

// Module Dependencies
var sass = require('node-sass');
var result = sass.renderSync({file: "public/stylesheets/style.scss"});

// Express Configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

const homeRoute = require('./routes/index.js')
const aboutRoute = require('./routes/about.js')
const loginRoute = require('./routes/login.js')
const registerRoute = require('./routes/register.js')

app.use(methodOverride('_method'))
app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "html")

nunjucks.configure(['views'], {
  autoescape: true,
  express: app
});

app.use('/',homeRoute)
// app.use('/about',aboutRoute)
app.use('/login',loginRoute)
app.use('/register',registerRoute)

app.get('/about', async (req, res) => {
  const products = await Product.find({});
  res.render('pages/about', {products});
})

app.get('/about/new', (req, res) => {
  res.render('pages/new');
})

app.post('/about', async (req, res) => {
  const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/about/${newProduct._id}`)
  console.log(newProduct);
})

app.get('/about/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id)
  res.render('pages/product', { product })
})

app.get('/about/:id/edit', async (req, res) => {
  const {id} = req.params;
  const product = await Product.findById(id)
  res.render('pages/edit', { product });
})

app.listen(port, () => {
  console.log(`App listening at localhost ${port}`)
})