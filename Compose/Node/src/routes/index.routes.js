const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose')
var cors = require('cors')



router.get('/users', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.json({ message: 'hola' })
})
router.get('/prod', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    let arr = [
        {
            id: 1020,
            categoria: 'Category 7',
            nombre: 'Product 20',
            imagen: 'https://picsum.photos/id/237/200/300',
            descripcion: 'La descripcion del producto',
            precio: '772.281'
        },
        {
            id: 1021,
            categoria: 'Category 7',
            nombre: 'Product 20',
            imagen: 'https://picsum.photos/id/237/200/300',
            descripcion: 'La descripcion del producto',
            precio: '772.281'
        },
        {
            id: 1022,
            categoria: 'Category 7',
            nombre: 'Product 20',
            imagen: 'https://picsum.photos/id/237/200/300',
            descripcion: 'La descripcion del producto',
            precio: '772.281'
        },
        {
            id: 1023,
            categoria: 'Category 7',
            nombre: 'Product 20',
            imagen: 'https://picsum.photos/id/237/200/300',
            descripcion: 'La descripcion del producto',
            precio: '772.281'
        },
        {
            id: 1024,
            categoria: 'Category 7',
            nombre: 'Product 20',
            imagen: 'https://picsum.photos/id/237/200/300',
            descripcion: 'La descripcion del producto',
            precio: '772.281'
        },
        {
            id: 1025,
            categoria: 'Category 7',
            nombre: 'Product 20',
            imagen: 'https://picsum.photos/id/237/200/300',
            descripcion: 'La descripcion del producto',
            precio: '772.281'
        }
        , {
            id: 1026,
            categoria: 'Category 7',
            nombre: 'Product 20',
            imagen: 'https://picsum.photos/id/237/200/300',
            descripcion: 'La descripcion del producto',
            precio: '772.281'
        }
        ,
        {
            id: 1027,
            categoria: 'Category 7',
            nombre: 'Product 20',
            imagen: 'https://picsum.photos/id/237/200/300',
            descripcion: 'La descripcion del producto',
            precio: '772.281'
        },
         {
            id: 1028,
            categoria: 'Category 7',
            nombre: 'Product 20',
            imagen: 'https://picsum.photos/id/237/200/300',
            descripcion: 'La descripcion del producto',
            precio: '772.281'
        },
         {
            id: 1029,
            categoria: 'Category 7',
            nombre: 'Product 20',
            imagen: 'https://picsum.photos/id/237/200/300',
            descripcion: 'La descripcion del producto bla bla bla bla blalablmalmblamblmalblmab bala blba la al',
            precio: '772.281'
        }


    ]
    res.json(arr);
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