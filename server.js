const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = new express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', './views/pages');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'My Homepage' });
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio', { title: 'Byron\'s Portfolio' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Get in Touch' });
});

app.post('/thanks', (req, res) => {
  res.render('thanks', { contact: req.body, title: 'Thanks ' + req.body.firstName });
});

app.get('*', (req, res) => {
  res.send('Page not found 404').status(404);
})

app.listen(8080, () => {
  console.log('Server is listening on http://localhost:8080');
});