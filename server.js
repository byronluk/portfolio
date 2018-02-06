const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sgMail = require('@sendgrid/mail');
const app = new express();
// config file exporting api key for sendgrid
// var SG_API_KEY = require('./config.js');
// env variable for heroku deployment
var SG_API_KEY = process.env.SG_API_KEY;

sgMail.setApiKey(SG_API_KEY);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', './views/pages');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Byron Luk | Front-End Web Developer' });
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio', { title: 'Projects | Front-End Web Developer' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'Byron Luk | Front-End Web Developer' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Me | Front-End Web Developer', mailSent: false });
});

app.post('/contact', (req, res) => {
  var firstName = req.body.firstName
  res.render('contact', { title: 'Thanks ' + firstName, firstName: firstName, mailSent: true });
  const msg = {
    to: 'byronluk@gmail.com',
    from: req.body.email,
    subject: 'Portfolio contact from ' + firstName + ' ' + req.body.lastName,
    text: req.body.message,
  };
  sgMail.send(msg);
});

app.get('*', (req, res) => {
  res.send('Page not found 404').status(404);
})
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Server is listening on http://localhost:' + port);
});