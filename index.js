const express = require('express')
var app = express();
const path = require('path');
const nunjucks = require('nunjucks');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const port = 3000

// Module Dependencies
var sass = require('node-sass');

var result = sass.renderSync({file: "public/stylesheets/style.scss"});

// Express Configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

const homeRoute = require('./routes/home.js')
const aboutRoute = require('./routes/about')

app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "html")

nunjucks.configure(['views'], {
  autoescape: true,
  express: app
});

app.use('/',homeRoute)
app.use('/about',aboutRoute)


app.listen(port, () => {
  console.log(`App listening at localhost ${port}`)
})