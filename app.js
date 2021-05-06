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

require('dotenv').config();

const port = Number(process.env.PORT);

const uri = String(process.env.MONGO_URI);
const connectOptions = {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
};

mongoose
    .connect(uri, connectOptions)
    .then()
    .catch((err) => console.log('Error:' + err));

mongoose.connection.once('open', () =>
    console.log('Connected to MongoDB successfully...')
);


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(helmet({ contentSecurityPolicy: false }));

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

const userRouter = require('./routes/user.route');
app.use('/users', userRouter);


app.get('*', (req, res) => {
    res.render('not-found');
});


app.listen(port, () =>
    console.log(`Parkify running at http://localhost:${port}`)
);
