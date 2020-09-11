let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer  = require('multer');
let postsRouter = require('./routes/posts');
let emailsRouter = require('./routes/emails');
let callbackRequestRouter = require('./routes/callback-requests');
let usersRouter = require('./routes/users');
let Post = require('./models/posts').Post;
let auth = require('./controllers/auth');
let cookieParser = require('cookie-parser');


let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/places'),
    filename: (req, file, cb) => cb(null, file.originalname)
});


mongoose.connect('mongodb+srv://talha:Talha1121@mycluster.l0q7b.mongodb.net/travels?retryWrites=true&w=majority', {useNewUrlParser: true}, { useUnifiedTopology: true });

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(multer( {storage: imageStorage}).single('imageFile'));
app.use(cookieParser());
app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestRouter);
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    res.sendFile('index.html', {root : __dirname + '/views'});
});

app.get('/home', (req, res) => {
    res.sendFile('home.html', {root : __dirname + '/views'});
});

app.get('/place', async (req, res) => {
    let id =  req.query.id;
    let post = await Post.findOne({id: id});
    res.render('place', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    });
});

app.get('/about', (req, res) => {
    res.sendFile('about.html', {root : __dirname + '/views'});
});

app.get('/contact', (req, res) => {
    res.sendFile('contact.html', {root : __dirname + '/views'});
});

app.get('/admin', (req, res) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        res.render('admin');
    } else {
        res.redirect('/login');
    }
    
})

app.get('/login', (req, res) => {
   res.render('login');
});

app.get('/notauthorized', (req, res) => {
   res.sendFile('notauthorized.html', {root: __dirname + '/views'})
});

app.get('*', (req, res) => {
    res.sendFile('404.html', {root : __dirname + '/views'});
});

app.listen(process.env.port || 3000, () => console.log('listening at 3000'));

