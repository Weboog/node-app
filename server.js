const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
hbs.registerHelper('copyright', ()=>{
    return new Date().getFullYear();
})

app.use((req, res, next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method}: ${req.path}`;
    fs.appendFile('server.log', log+'\n');
    next();
});


/* app.use((req, res, next)=>{
    res.render('maintenance.hbs');
}) */

app.use(express.static(__dirname+'/public'));

app.get('/',(req, res)=>{
    res.render('home.hbs', {
        title: 'Home page',
        content: 'Lets go learn !nodeJs',
    });
});

app.get('/user',(req, res)=>{
    res.send({
        name: 'Weboog',
        hobbies: [
            'voyaging',
            'coding'
        ]
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        title: 'Contact Page',
    });
})

app.listen(3000, ()=>{
    console.log('Server is Running on port 30000...');
});