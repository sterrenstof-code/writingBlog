var express = require('express');
var router = express.Router();
// var axios = require('axios');
let path = require('path')

router.get('/', function(req, res, next){
    res.render('pages/login.html')});
    
router.post('/', (req, res) => {
   
})

module.exports = router;