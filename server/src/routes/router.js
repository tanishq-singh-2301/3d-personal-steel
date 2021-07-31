const express = require('express');
const route = express.Router();

const controller = require('../controller/controller');

route.get('/', controller.home);
route.get('/api/getreview/:page', controller.getReview);
route.post('/api/addreview/:page', controller.addReview);

module.exports = route;