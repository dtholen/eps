const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var Keycloak = require('keycloak-connect');
var cors = require('cors');


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



// Enable CORS support
app.use(cors());

// Create a session-store to be used by both the express-session
// middleware and the keycloak middleware.

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'Password12345!',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Provide the session store to the Keycloak so that sessions
// can be invalidated from the Keycloak console callback.
//
// Additional configuration is read from keycloak.json file
// installed from the Keycloak web console.

var keycloak = new Keycloak({
    store: memoryStore
  });
  
  app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/'
  }));

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/lib', lib);

app.get('/service/public', function (req, res) {
    res.json({message: 'public'});
  });
  
  app.get('/', keycloak.protect('library:dieter.tholen@web.de'), function (req, res) {
    res.json({message: 'secured'});
  });
  
  app.get('/service/admin', keycloak.protect('realm:admin'), function (req, res) {
    res.json({message: 'admin'});
  });
  
  app.use('*', function (req, res) {
    res.send('Not found!');
  });


let port = 8085;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
