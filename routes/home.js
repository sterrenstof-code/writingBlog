var express = require('express');
var router = express.Router();
// var axios = require('axios');
let path = require('path')
const content = require('../content/book.js');

router.get('/', function(req, res, next){
    res.render('pages/index.html',{content})});
    
module.exports = router;