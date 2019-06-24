const express = require('express');
const app = express();
const logger = require('morgan');











app.set('view engine', 'ejs')
app.use(logger('dev'));
app.set("views", "views");










  app.get('/', function (req, res) {
    res.render('index');
  });





const DOMAIN = 'localhost';
const PORT = '4646';
app.listen(PORT, DOMAIN, () => {
    console.log(`🖥 Server listenning on http://${DOMAIN}:${PORT}`);
});