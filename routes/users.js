let express = require('express');
let router = express.Router();
let User = require('../models/users').User;
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');


router.post('/login', async (req, res) => {
   let body = req.body; 
   let email = body.email;
   let password = body.password;
   let user = await User.find().where({email: email});
  
   if(user.length > 0) {
       let compareResult = await bcrypt.compare(password, user[0].password);
       if(compareResult) {
           let token = auth.generateToken(user[0]);
           res.cookie('auth_token', token);
           res.send({
               redirectURL: '/admin'
           });
       } else {
        res.status(400);
       res.send('rejected');
       }
   } else {
       res.status(400);
       res.send('rejected');
   }
});

router.post('/register', async (req, res) => {
    let body = req.body; 
   let email = body.email;
   let password = body.password;
   let user = await User.find().where({email: email});
   if(user.length === 0) {
       let encryptedPass = await bcrypt.hash(password, 12);
       let newUser = new User({
           email: email,
           password: encryptedPass
       })
      await newUser.save();
      res.send('done');
   } else {
       res.send('rejected');
   }
}); 


module.exports = router;