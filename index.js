var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');


const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// Set Handlebar Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



// API KEY pk_2c23c234921c49a5af033a17906cc16a
function call_api(readAPI, ticker){
    request('https://cloud.iexapis.com/stable/stock/'+ ticker + '/quote?token=pk_2c23c234921c49a5af033a17906cc16a', { json: true }, (err, res, body) => {
        if (err) {
            return console.log(err)
        };
        if (res.statusCode === 200){
            //console.log(body);
            readAPI(body)
        };
    });
}



// Set handlebar index GET route
app.get('/', function (req, res) {
    call_api(function(readAPI) {
            res.render('home', {
            stock: readAPI
       });
    }, 'fb');


});

// Set handlebar index POST route
app.post('/', function (req, res) {
    call_api(function(readAPI) {
            // posted_data = req.body.stock_ticker;
            res.render('home', {
            stock: readAPI,
       });
    }, req.body.stock_ticker);


});



// Set handlebar routes
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log("Server listening on port " + PORT))