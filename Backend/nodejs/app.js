const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const api = require('./routes/user.routes');
require('dotenv').config();
var useragent = require('express-useragent');
const requestIp = require('request-ip');
app.use(requestIp.mw())
app.use(useragent.express());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"))
app.use('/api', api);

// set Header
app.use((req,res,next)=>{
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE")
    // Request headers you wish to allow
   res.setHeader( "Access-Control-Allow-Headers","X-Requested-With,content-type");
   // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
  })
// Error Page
app.use((req,res,next)=>{
    var err = new Error('not found');
    err.status = 404;
    next(err);
  })

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    if (err.status === 404) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = app;