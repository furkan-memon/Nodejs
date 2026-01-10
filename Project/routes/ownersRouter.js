const express = require('express');
const router = express.Router();
const ownerModel = require('../model/owner')

router.get('/', (req, res) => {
    res.send('yooo  router done ');
})
if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        let owner = ownerModel.find();
        if (owner.length > 0) {
            return res
                .send(503)
                .send("you don't have permission create a new owner")
        }
        let {fullname,email,password} = req.body
      let createdowner =  await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.send(createdowner)
    })
}

module.exports = router 