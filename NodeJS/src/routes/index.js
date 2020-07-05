const {Router}=require('express')
const app = require('../app')

const router=Router()
router.get('/',(req,res)=>res.json({message:'hola'}))

module.exports=router;