const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
let app = express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
hbs.registerHelper('copyright', ()=>{
    return new Date().getFullYear();
})

app.use((req, res, next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method}: ${req.path}`;
    fs.appendFile('server.log', log+'\n', (err)=>{

    });
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

app.get('/projects', (req, res)=>{
    res.render('projects.hbs', {
        title: 'Projects'
    })
})

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        title: 'Contact Page',
    });
})

app.listen(port, ()=>{
    console.log(`Server is Running on port ${port}...`);
});