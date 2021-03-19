const express = require('express');
const app = express();
const path = require('path');
const mainRoutes = require('./routes/routes');
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.set('/', path.join(__dirname, '../frontend/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/', mainRoutes);
app.use('/images', express.static('../frontend/images'));
app.use('/css', express.static('../frontend/css'));
app.use('/js', express.static('../frontend/js'));

 
// for page not found (i.e., 404)
app.use(function (req, res, next) {
  res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
})

// RUN SERVER
let port = 8888;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
})