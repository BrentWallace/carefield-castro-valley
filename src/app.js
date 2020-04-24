const path = require('path');
const express = require('express');
const hbs = require('hbs');
const helmet = require('helmet');
const router = require('../routers/routes');
require('dotenv').config();

const app = express();
app.use(helmet());

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use((req, res, next) => {
  res.status(404).send('Error: 404 - Not Found');
});

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

const port = process.env.PORT;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${port}`);
});
