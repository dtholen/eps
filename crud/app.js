const express = require('express');
// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost/products';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
const handlebars = require('express-handlebars');
const redis = require("redis");
const client = redis.createClient();
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
client.on("error", function(error) {
  console.error(error);
});


const bodyParser = require('body-parser');
const product = require('./routes/product.route'); 

// Imports routes for the products
const app = express();
//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations (we will go through them later on)

app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'default',
    }));

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('main', {
        suggestedChamps: fakeApi()};
    });

app.use('/products', product);
let port = 8080;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
