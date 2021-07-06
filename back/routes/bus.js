const express = require('express');
const router = express.Router();
const { Bus } = require('../models');
const { isLoggedIn } = require('./middlewares');

router.get('/',isLoggedIn,async(req,res,next)=>{
    try{
        const where ={};
        if(parseInt(req.query.lastId, 10 )){
            where.id ={ [ Op.lt ]: parseInt(req.query.lastId,10)};
        }
        const bus = await Bus.findAll({
            where,
            limit:10,
            order:[
                ['createdAt','DESC'],
            ]
        })
        res.status(200).json(bus);
    }catch(error){
        console.error(error);
        next(error);
    }
})

router.post('/',isLoggedIn, async(req,res,next)=>{
    try{
        const bus = await Bus.create({
            bus : req.body.bus,
        })
        res.status(201).json(bus); 
    }catch(error){
        console.error(error);
        next(error);
    }
})


module.exports = router;