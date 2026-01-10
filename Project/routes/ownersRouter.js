const express = require('express');
const router = express.Router();
const ownerModel = require('../model/owner')

if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        let owner = await ownerModel.find();
        if (owner.length > 0) {
            return res
                .status(503).send("you don't have permission create a new owner")
        }
        let {fullname,email,password} = req.body
      let createdowner =  await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.status(201).send(createdowner)
    })
}
router.get('/', (req, res) => {
    res.send('yooo  router done ');
})


module.exports = router 