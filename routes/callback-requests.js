let express = require('express');
let router = express.Router();
let uniqId = require('uniqid');
let callbackRequest = require('../models/callback-requests').callbackRequest;
let authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
    res.send(await callbackRequest.find());
    
});

router.post('/', async (req, res) => {
   let body = req.body;
   
   let newRequest = new callbackRequest( {
         id: uniqId(),
         phoneNumber: body.phoneNumber,
         date: new Date()
   })
   await newRequest.save();
   res.send('Accepted!');
});

router.delete('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
   await callbackRequest.deleteOne({id: id});
   res.send('Deleted!');
});

module.exports = router;