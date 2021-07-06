const express =require('express');
const router = express.Router();
const { Op} =require('sequelize');
const { Option,OptionDetail,Company } =require('../models');
const { isLoggedIn } =require('./middlewares');

router.get('/', isLoggedIn, async (req,res,next)=>{
    try{
        const where ={};        
        if(parseInt(req.query.lastId,10)){
            where.id= { [Op.lt] : parseInt(req.query.lastId,10)};
        }
        const options = await Option.findAll({
            where,
            limit:10,
            order:[
                ['createdAt','DESC'],
            ],include:[{
                model:OptionDetail,
                include:[{
                    model:Company,
                    as:'OpCompany'
                }]
            }]
        })
        res.status(200).json(options);
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/', isLoggedIn, async (req,res,next) =>{
    try{
        const optioncheck =await Option.findOne({
            where : { option : req.body.option }
        });
        if(optioncheck){
            return res.status(403).send('존재하는 옵션입니다.')
        }
        const option = await Option.create({
            option:req.body.option,
            content:req.body.content,
        })
        if((req.body.detail && req.body.adult && req.body.child) !== '' ){
           await OptionDetail.create({
                detail:req.body.detail,
                adult:req.body.adult,
                child:req.body.child,
                OptionId: option.id,
            })
        }    
        const fullOption = await Option.findOne({
            where: { id : option.id},
            include:[{
                model:OptionDetail,
                include:[{
                    model:Company,
                    as:'OpCompany'
                }]
            }]
        })
        res.status(201).json(fullOption);
    }catch(error){
        console.error(error);
        next(error);
    }
});


router.post('/:optionId/detail', isLoggedIn  ,async (req,res,next) =>{
    try{
        const optioncheck =await Option.findOne({
            where : {id: parseInt(req.params.optionId) }
        });
        if(!optioncheck){
            return res.status(403).send('존재하지 않는 옵션입니다.');
        }
        const detail = await OptionDetail.create({
            detail:req.body.detail,
            adult:req.body.adult,
            child:req.body.child,
            OptionId: parseInt(req.params.optionId),
        })
        const fullDetail =await OptionDetail.findOne({
            where : { id : detail.id },
            include:[{
                model:Company,
                as:'OpCompany'
            }]
        })
        res.status(201).json(fullDetail);
    }catch(error){
        console.error(error);
        next(error);
    }
})

router.get('/:optionId/detail', isLoggedIn  ,async (req,res,next) =>{
    try{
        // const optioncheck =await Option.findOne({
        //     where : {id: parseInt(req.params.optionId) }
        // });
        // if(!optioncheck){
        //     return res.status(403).send('존재하지 않는 옵션입니다.');
        // }
        const fullDetail = await OptionDetail.findAll({
            where : { OptionId : parseInt(req.params.optionId) },
        })
        res.status(201).json(fullDetail);
    }catch(error){
        console.error(error);
        next(error);
    }
})

module.exports = router;