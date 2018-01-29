const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sgMail = require('@sendgrid/mail');
const SG_API_KEY = require('./config.js');
const app = new express();

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

app.post('/contact', (req, res, e) => {
  var firstName = req.body.firstName
  res.render('contact', { title: 'Thanks ' + firstName, firstName: firstName, mailSent: true });
  const msg = {
    to: 'byronluk@gmail.com',
    from: req.body.email,
    subject: 'Portfolio Contact',
    text: req.body.message,
  };
  // sgMail.send(msg);
});

app.get('*', (req, res) => {
  res.send('Page not found 404').status(404);
})

app.listen(8080, () => {
  console.log('Server is listening on http://localhost:8080');
});