const express = require('express');
const router = express.Router();
const ownerModel = require('../model/owner');
const ProductModel = require('../model/Product')
router.get('/', (req, res) => {
    res.render('owner-login')
})
router.post('/', (req, res) => {

    res.redirect('/owners/admin')
})
router.get('/admin', async(req, res) => {
    let products = await ProductModel.find()
 
    
    res.render('admin', {products})
})

router.get('/create', (req, res) => {
    res.render('owner-RAGISTER')
})
router.get('/addproduct', (req, res) => {
    let success = req.flash('success')
  
    res.render('createproducts')
})


    router.post('/create', async (req, res) => {
        try{
            console.log(process.env.NODE_ENV);
            
            if (process.env.NODE_ENV !== "development") {
                return res
        .status(403)
        .send("You don't have permission to create a new owner");
            }
             const existingOwner = await ownerModel.findOne();
            
             if (existingOwner) {
      return res
        .status(503)
        .send("Owner already exists");
    }
    console.log(req.body);
    
    let {fullname,email,password} = req.body
    let createdowner =  await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.redirect('/owners');
        }catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
    })




module.exports = router 
// $env:NODE_ENV="development"