const mongoose=require('mongoose')

mongoose.connect('mongodb://mongo/prueba',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(db=>console.log('Db is connected to ',db.connection.host))
    .catch(err=>console.error(err))

module.exports=mongoose

