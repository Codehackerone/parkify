/* ------------ Imports ----------- */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const session = require('express-session');
const MongoDBStore = require('connect-mongo')(session);
const flash = require('express-flash');
const helmet = require('helmet');
const methodOverride = require('method-override');

/* ------------ Configs ----------- */

// initialize module to access .env variables
require('dotenv').config();

// access port from env
const port = Number(process.env.PORT);

// db connection variables
const uri = String(process.env.MONGO_URI);
const connectOptions = {
    useNewUrlParser: true, // used for parsing the uri
    useCreateIndex: true, // use mongoose's default index
    useUnifiedTopology: true, // use the newer topology engine
    useFindAndModify: false, // allow findOneAndUpdate()
};

/* ------------ MongoDB Setup ----------- */

// initiate connection to mongodb
mongoose
    .connect(uri, connectOptions)
    .then()
    .catch((err) => console.log('Error:' + err));

// log message on connection success
mongoose.connection.once('open', () =>
    console.log('Connected to MongoDB successfully...')
);

const app = express();

const secret = process.env.SECRET;

const store = new MongoDBStore({
    url: uri,
    secret,
    touchAfter: 24 * 60 * 60,
});

// session initialization
store.on('error', function (e) {
    console.log('SESSION STORE ERROR', e);
});

const sessionConfig = {
    store, // session store
    name: 'session', // session name
    secret, // session secret
    resave: false, // don't save session if unmodified
    saveUninitialized: true, // don't create session until something stored
    cookie: {
        httpOnly: true, // don't let browser javascript access cookies
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // expire in 7 days
        maxAge: 1000 * 60 * 60 * 24 * 7, // expire in 7 days
    },
};

app.use(cors()); // allow cross-origin requests
app.use(express.json()); // parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // parse the incoming requests with URL encoded payloads
app.use(cookieParser()); // parse the incoming requests with cookies
app.use(session(sessionConfig)); // initialize session
app.use(flash()); // initialize flash messages
app.use(methodOverride('_method')); // override HTTP methods
app.use(helmet({ contentSecurityPolicy: false }));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

// use ejs template engine and allow serving static files
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//include routes from /
app.get('/', (req, res) => {
    res.render('index');
});

//include routes from /users
const userRouter = require('./routes/user.route');
app.use('/users', userRouter);

//include routes from /garages
const garageRouter = require('./routes/garage.route');
app.use('/garage', garageRouter);

//include routes from /slots
const slotRouter = require('./routes/slot.route');
app.use('/slot', slotRouter);

//include routes from /booking
const bookingRouter = require('./routes/booking.route');
app.use('/booking', bookingRouter);

// handle all routes without endpoints
app.get('*', (req, res) => {
    res.render('not-found');
});

// start the parkify server
app.listen(port, () =>
    console.log(`Parkify running at http://localhost:${port}`)
);
