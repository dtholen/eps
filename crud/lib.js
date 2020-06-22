const express = require('express');
// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost/lib';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


mongoose.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true  });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//Loads the handlebars module



const bodyParser = require('body-parser');
const lib = require('./routes/lib.route'); 

const app = express();
//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations (we will go through them later on)

app.engine('hbs', expressHandlebars ({
    layoutsDir: __dirname + '/views/layouts',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: 'hbs',
    defaultLayout: 'default'
    }));

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/lib', lib);
let port = 8080;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
