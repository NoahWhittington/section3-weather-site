const path = require('path'),
express = require('express'),
app = express(),
port = process.env.PORT || 3000,
hbs = require('hbs'),
request = require('postman-request'),
geoCode       = require('../utils/geocode'),
weatherCall   = require('../utils/weather')  

//defines paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set up static directory to serve
app.use(express.static(publicDir));

//set handlebar engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        message: 'Use this site to get your weather',
        name: 'Noah Whittington'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Noah Whittington'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Noah Whittington'
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query.address)
    if(!req.query.address){
        return res.send({
            error: 'Must provide an address to get a weather forecast'
        });
    };

    geoCode(req.query.address, (err, {latlon, message} = {})=> {
        if(err){
           res.send({
            error: 'Invalid search. Try another'
           }) ;
        }
            console.log(message);
            weatherCall(latlon, (err, data) => {
            if(err){
                return console.log(err);
            }
            res.send({
                err,
                data,
                name: 'Noah Whittington',
                address: req.query.address
            });
        });
    }); 
});

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: "Help article not found",
        name: 'Noah Whittington'
    })
});

app.get('*', (req,res) => {
    res.render('notFound',{
        title: 'Page not found',
        name: 'Noah Whittington'
    });
})

app.listen(port, ()=>{
    console.log(`Server is on port:${port}`)
})