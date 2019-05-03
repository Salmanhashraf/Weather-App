const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');//changes the path for views directory and calls it templates 
const partialsPath = path.join(__dirname, '../templates/partials');

//console.log(__dirname); //path to current folder
//console.log(path.join(__dirname, '../public')); //path.join tells you the absolute path from dirname to whatever arg u give it

app.set('view engine', 'hbs'); //sets up view engine (similar to ejs)
app.set('views', viewsPath); //lets express look for templates in the new path
hbs.registerPartials(partialsPath); //allows partials to be used with hbs templates in views

app.use(express.static(publicDirPath)); //use static pages from specific folder



app.get('', (req, res) => { //index.html will always take precedence in being served for a route directory
    res.render('index', { //view engines automatically check views folder so no need to set path
        title: 'Weather',
        name: 'Andrew'
    }); 
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Do you need any help',
        title: 'Help',
        name: 'Andrew'

    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Salman'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
                                                                        //to prevent destructuring of undefined
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{ //address from query string
        if(error){
            return res.send({error: error});
        } else {
            forecast(latitude, longitude, (error, forecastData) =>{
                if(error) {
                    return res.send({error: error});
                } else {
                    return res.send({location: location, forecast: forecastData.summary});
                }
            });
        }
    });

});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query); //logs query string onto the console
    res.send({ //sending two responses causes an error, you cant do that
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'This help article was not found'
    });
});

app.get('*', (req, res) => { //get for anything that hasn't been explicitly coded for
    res.render('404', {
        title: '404',
        error: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server has started')
});