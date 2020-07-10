const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose')

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

module.exports = router