const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')
const path = require('path');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//connect DB
db.connect();
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'))

// HTTP logger
//app.use(morgan('combined'));
// template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
           sum(a, b)  {return a + b}
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
// route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
