const express=require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
const app=express();
app.use(cors())


app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
app.use(require('./routes/index.routes'))
app.listen(3000)

console.log('Server on port ',3000)