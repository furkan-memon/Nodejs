const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('yooo  router done ');
    
})
module.exports = router 