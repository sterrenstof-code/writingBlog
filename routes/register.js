var express = require('express');
var router = express.Router();
// var axios = require('axios');
let path = require('path');

router.get('/', function(req, res, next){
    res.render('pages/register.html')});
    
router.post('/', async (req, res) => {
       
})

module.exports = router;