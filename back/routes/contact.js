const express = require('express');
const router = express.Router();
const { Op } =require('sequelize');
const { Company,Contact,Account,Tel,Messenger, Country } =require('../models');
const { isLoggedIn } =require('./middlewares');


router.get('/', isLoggedIn, async (req,res,next)=>{  
    try{
        const where ={};
        if(parseInt(req.query.lastId, 10 )){
            where.id ={ [ Op.lt ]: parseInt(req.query.lastId,10)};
        }

        const contacts = await Contact.findAll({
            where,
            limit:10,
            order:[
                ['createdAt','DESC'],
            ],include:[{
                model:Company,
                attributes:['id','company']
            },{
                model:Account,
                attributes:['id','account'],
                include:[{
                     model:Messenger,
                     attributes:['id','messenger']
                }]
            },{
               model:Tel,
               attributes:['id','tel'],
               include:[{
                   model:Country,
                   attributes:['id','country']
               }]
            }]
        })

        res.status(200).json(contacts);
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/', isLoggedIn, async (req,res,next) => {
    try{
        console.log(req.body);
        const contact = await Contact.create({
            name : req.body.name,
            CompanyId: parseInt(req.body.company),
            gender : req.body.gender,
            position: req.body.position,
            email:req.body.email,
            work:req.body.work,
        })
        const fullContact = await Contact.findOne({
            where :{ id : contact.id},
            include:[{
                model : Company,
            }]
        })
        res.status(201).json(fullContact)
    }catch(error){
        console.error(error);
        next(error);
    }
});


router.post('/:contactId/account', async (req,res,next) => {
    try{
        console.log(req.body);
        const accountbefore = await Account.findOne({
            where:{
                account: req.body.account,
                MessengerId: parseInt(req.body.messenger),
            }
        });
        if(accountbefore){
            return res.status(403).send('이미 등록되어있는 메신저입니다.');
        }
        const account = await Account.create({
            account: req.body.account,
            MessengerId: parseInt(req.body.messenger),
            ContactId: parseInt(req.params.contactId),
        })
        const fullAccount = await Account.findOne({
            where : {id : account.id },
            attributes:{include:['id','account']},            
            include:[{
                model:Messenger,
                attributes:['id','messenger']
            }]
        })
        res.status(201).json(fullAccount);
    }catch(error){
        console.log(error);
        next(error);
    }
})

router.post('/:contactId/tel', async (req,res,next) => {
    try{
        console.log(req.body);
        const telbefore = await Tel.findOne({
            where:{
                tel: req.body.tel,
                CountryId: parseInt(req.body.country),
            }
        });
        if(telbefore){
            return res.status(403).send('이미 등록되어있는 전화번호입니다.');
        }
        const tel = await Tel.create({
            tel: req.body.tel,
            CountryId: parseInt(req.body.country),
            ContactId: parseInt(req.params.contactId),
        })
        const fullTel = await Tel.findOne({
            where : {id : tel.id },
            attributes:{include:['id','tel']},            
            include:[{
                model:Country,
                attributes:['id','country']
            }]
        })
        res.status(201).json(fullTel);
    }catch(error){
        console.log(error);
        next(error);
    }
})




module.exports = router;