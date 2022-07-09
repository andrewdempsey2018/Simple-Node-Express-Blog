const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();

const app = express();

//port we are listening on
const PORT = process.env.PORT;

//connect to mongoDB
const DB_URI = process.env.DB_URI;

//connect to the db and start listening on port if connection is successful
mongoose.connect(DB_URI)
    .then((result) => {
        console.log("connected to db");
        app.listen(PORT);
    })
    .catch((err) => {
        console.log('failed to connect to the db');
    });

//register ejs as the view engine to be used
app.set('view engine', 'ejs');

//use morgan logging middleware
app.use(morgan('dev'));

//parses post requests into objects for easier handling
app.use(express.urlencoded({ extended: true }));

//set the static folder
app.use(express.static('staticfiles'));

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'example title',
        snippet: 'example snippet',
        body: 'example blog body'
    })

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/single-blog', (req, res) => {
    Blog.findById('61620883feadfa3679f26804')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'about page' })
});

//blog routes
app.use('/blogs', blogRoutes);

//if no other routes are found, go to the 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'woops wrong page' });
});