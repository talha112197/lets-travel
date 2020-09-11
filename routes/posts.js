let express = require('express');
let router = express.Router();
let uniqId = require('uniqid');
let Post = require('../models/posts').Post;
let authMiddleware = require('../middleware/auth');

router.get('/', async (req, res) => {
    let posts =  await Post.find();
    res.send(posts);
});

router.get('/:id', async (req, res) => {
   let id = req.params.id;
   let posts = await Post.findOne({id: id});
   res.send(posts);
});


router.post('/', authMiddleware, async (req, res) => {
   let body = req.body;
   let imgPath;
   if(body.imageURL) {
       imgPath = body.imageURL;
   } else {
       imgPath = '/places/' + req.file.filename;
       
   }
   let newPost = new Post( {
         id: uniqId(),
         title: body.title,
         country: body.country,
         date:  new Date,
         description: body.description,
         text: body.text,
         imageURL: imgPath
   })

   await newPost.save();
   res.send('Created!');
});

router.delete('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
   await Post.deleteOne({id: id});
   res.send('Deleted!');
});


router.put('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    res.send('Updated!')

})

module.exports = router;