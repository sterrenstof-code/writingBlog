const express = require('express')
var app = express();
const path = require('path');
const nunjucks = require('nunjucks');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const port = 3000;
const bcrypt = require('bcryptjs');


// Module Dependencies
var sass = require('node-sass');

const users = [];

var result = sass.renderSync({file: "public/stylesheets/style.scss"});

// Express Configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

const homeRoute = require('./routes/home.js')
const aboutRoute = require('./routes/about.js')
const loginRoute = require('./routes/login.js')
const registerRoute = require('./routes/register.js')
const content = require('./content/book');

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
app.use('/about',aboutRoute)
app.use('/login',loginRoute)
app.use('/register',registerRoute)

app.get('/comments', (req, res) => {
  res.render('pages/home.html',{home:{
    content: content
}})});

app.get('/comments/new', (req, res) => {
  res.render('pages/comments/new.html')
});

app.post('/comments', (req, res) => {
  const {username, comment, formID} = req.body;
  
  const foundForm = content.find(chap => chap.id === formID);
  
  foundForm.comments.push({
    id: uuid(),
    username, comment
  })
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App listening at localhost ${port}`)
})