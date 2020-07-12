const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose')
var cors = require('cors')
mongoose.connect('mongodb://mongo/prueba', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Db is connected to ', db.connection.host))
    .catch(err => console.error(err))


const Schema = mongoose.Schema;

const users = new Schema({
    name: String,
});

const MyModel = mongoose.model('users', users)
router.get('/', (req, res) => {
    res.json({ 'msg': 'hola' })
})
router.get('/users', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    MyModel.find({}, function (err, docs) {
        res.json({ data: docs })
    });
    // res.send('hola')
})
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.post('/insertar', cors(corsOptions), (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    let json = req.body.name
    var nuevo = new MyModel({ name: json })
    nuevo.save((err) => {
        if (err) {
            res.json({ message: false })
        }
        res.json({ message: true })
    })

})
module.exports = router