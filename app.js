var express = require('express')
var router = express.Router();
var path = require('path');

const mongoose = require('mongoose')
let mongoDB = "mongodb://localhost/QRDatabase"

var app = express()

// view engine setup
let exphbs = require('express-handlebars');
const extNameHbs = 'hbs';
let hbs = exphbs.create({extname: extNameHbs});
app.engine(extNameHbs, hbs.engine);
app.set('view engine', extNameHbs);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


let userController = require(__dirname+'/controllers/userController')
let adminController = require(__dirname+'/controllers/adminController')


//connect to mongoDB
mongoose.connect(mongoDB, {useNewUrlParser: true })
mongoose.Promise = global.Promise
let db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error: '))

db.once('open', ()=>{
  console.log("Connected to MongoDB")
})

app.listen(3000, function () {
    console.log('listening on port 3000');
})


app.get('/', (req, res) => {
    res.render('login');
});

app.post('/', adminController.login);


app.get('/users/showAll', userController.user_list)

app.get('/user', (req, res) => {
    res.render('register');
});


app.get('/user/login', (req, res) => {
    res.render('userLogin');
});


app.post('/user/login', userController.user_find)



app.get('/qr', (req, res) => {
    res.render('qr-reader');
});

app.post('/qr', userController.user_find_by_qr)

app.post('/registerUser', userController.registerUser)

app.post('/user', userController.user_create)


