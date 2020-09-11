let express = require('express');
let router = express.Router();
let uniqId = require('uniqid');
let Email = require('../models/emails').Email;
let authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware,  async (req, res) => {
    res.send(await Email.find());
    
});

router.post('/', async (req, res) => {
   let body = req.body;
   
   let newEmail = new Email( {
         id: uniqId(),
         name: body.name,
         email: body.email,
         phoneNumber: body.phoneNumber,
         message: body.message,
         date: new Date()
   })
   await newEmail.save();
   res.send('Accepted!');
});

router.delete('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
   await Email.deleteOne({id: id});
   res.send('Deleted!');
});

module.exports = router;