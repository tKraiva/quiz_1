const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');









function redirectIfNoUser(req, res, next) {
    if(res.locals.username) {
      console.log('if statement hit')
      next();
    } else {
      res.render('sign_in');
    }
  }

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs')
app.use(logger('dev'));
app.set("views", "views");
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true }))



app.use((request, response, next) => {

    console.log("🍪 Cookies:", request.cookies);
  
    // response.locals is where we store local variables to be used in other middleware
    response.locals.username = "";
    const username = request.cookies.username;
    if (username) {
      response.locals.username = username;
    }
  
    // The third argument this callback (or middleware function)
    // is a function typically named "next". When called,
    // it tells Express that his middleware has completed work and
    // to move on to the next middleware.
    next();
  })

  


  app.get('/', redirectIfNoUser, (req, res) => {
  
    // we get this req.cookies from the cookie-parser middleware
    console.log(req.cookies);
  
    // log out the res.locals.username value
    console.log(res.locals.username);
    const username = res.locals.username;
  
    // responds with /views/home.ejs
    res.render('index', {username: username});
  });



  app.get('/sign_in', function (req, res) {
    res.render('sign_in');
  });

  app.post("/sign_out", (req, res) => {
    // method that will set a Header telling the browser to clear said cookie.
    res.clearCookie("username");
    res.redirect("/");
  });

  const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 1 week;
  app.post("/sign_in", (req, res) => {
    // request.body is only available because we've used
    // the body parser (app.use(express.urlencoded({ extended: true }))) middleware
    const username = req.body.username;
    // `response.cookie(<cookie-name>, <cookie-value>, <options>)`
    // The above method is added to the response by the "cookie-parser"
    // middleware. Use it to send cookies to the browser.
  
    // The arguments are in order:
    // - A string that is the name of the cookie
    // - A value for the cookie
    // - (optional) options for the cookie
    res.cookie("username", username, { maxAge: COOKIE_MAX_AGE });
    res.redirect("/");
  });



const DOMAIN = 'localhost';
const PORT = '4646';
app.listen(PORT, DOMAIN, () => {
    console.log(`🖥 Server listenning on http://${DOMAIN}:${PORT}`);
});