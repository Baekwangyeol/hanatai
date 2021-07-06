const express = require('express');
const router = express.Router();
const { Op } =require('sequelize');
const { Party,
        Hanacode, 
        User, 
        Airnumber,
        Reservecode,
        Reserveperson,
        Roomtypereserve,
        Roomtype,
        Hotel,
        Reserveoption,
        OptionDetail,
        Option
        } = require('../models');
const { isLoggedIn } = require('./middlewares');

//파티 로드 서치
router.get('/', isLoggedIn, async (req,res,next)=>{
    try{
        const where ={};
       
        where.startdate = { [ Op.gte ]: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
                            [ Op.lte ]: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
        };
        if(req.query.start){
            where.startdate = { [ Op.gte ]: req.query.start};
        }
        if(req.query.start && req.query.end){
            where.startdate = { [ Op.gte ]: req.query.start,
                                [ Op.lte ]: req.query.end };
        }
        if(req.query.search){
            const hanacodeId = await Hanacode.findOne({
                where:{
                    code:req.query.search
                }
            }) 
            if(hanacodeId){
                where.id  = hanacodeId.partyId
            }else {
                where.code = req.query.search;
            }
        }
        const party = await Party.findAll({
            where,
            limit:10,
            offset:parseInt(req.query.offset),
            order:[
                ['startdate','ASC'],
            ],include:[{
                model:Hanacode,
            },{
                model:User,
                attributes:['id','name']
            },{
                model:Airnumber
            }]
        })

        res.status(200).json(party);
    }catch(error){
        console.error(error);
        next(error);
    }
})

//파티추가
router.post('/', isLoggedIn, async (req,res,next)=>{
    try{
        const partyCheck = await Party.findOne({
            where: { party : req.body.party}
        })
        if(partyCheck) {
            return res.status(401).send('동일파티명 존재');
        }

        const party = await Party.create({
            party: req.body.party,
            startdate: req.body.startDate
        })

        const fullParty = await Party.findOne({
            where: {id : party.id},
            include:[{
                model:Hanacode,
            },{
                model:User,
                attributes:['id','name']
            },
            {
                model:Airnumber
            }
        ]
        })
        res.status(201).json(fullParty);
    }catch(error){
        console.error(error);
        next(error);
    }
})

//하나코드 추가
router.post('/:partyId/confirm', isLoggedIn, async (req,res,next)=>{
    try{
        const party = await Party.findOne({
            where: { id : parseInt(req.params.partyId)}
        })
        const hanacodes = await Promise.all(req.body.code.map((code) => Hanacode.findOne({
            where: { id : code }
        })))
        await party.addHanacodes(hanacodes);

        const fullhanacode = await Promise.all(req.body.code.map((code) => Hanacode.findOne({
            where: { id : code }
        })))

        res.status(201).json(fullhanacode);
    }catch(error){
        console.error(error);
        next(error);
    }
})

//가이드 추가
router.post('/:partyId/guide', isLoggedIn, async (req,res,next)=>{
    try{   
        const usercheck = await User.findOne({
            where: { id : req.body.guide}
        })
        var guide = req.body.guide;
        if(req.body.guide === ""){
            var guide = null;
        }
       
          await Party.update({
            UserId: guide,
           },{
                where: { id : parseInt(req.params.partyId)}
        })
        const exUser = await User.findOne({
            where: {id : req.body.guide},
            attributes:['id','name']
        })
        res.status(200).json({exUser, guide, PartyId:parseInt(req.params.partyId)})
    }catch(error){
        console.error(error);
        next(error);
    }
})

//항공추가 
router.post('/:partyId/airnumber', isLoggedIn, async (req,res,next)=>{
    try{   
        const airnumbercheck = await Airnumber.findOne({
            where: { id : req.body.airNumberId}
        })
          await Party.update({
            airnumberId: req.body.airNumberId,
           },{
                where: { id : parseInt(req.params.partyId)}
           })

        res.status(200).json({airnumbercheck, PartyId:parseInt(req.params.partyId)})
    }catch(error){
        console.error(error);
        next(error);
    }
})

//파티1페이지
router.get('/:partyId', isLoggedIn, async (req,res,next)=>{
    try{
        const party = await Party.findOne({
            where : {id: parseInt(req.params.partyId) },
        });

        const fullParty = await Party.findOne({
            where : {id : party.id },
            include:[{
                model:Hanacode,
                include:[{
                    model:Reservecode,
                    include:[{
                        model:Reserveperson,
                        include:[{
                            model:Roomtypereserve,
                            include:[{
                                model:Roomtype,
                                include:[{
                                    model:Hotel
                                }]
                            }]
                        },{
                            model:Reserveoption,
                            include:[{
                                model:OptionDetail,
                                include:[{
                                    model:Option
                                }]
                            }]
                        }]
                    }]
                }]
            },{
                model:User,
                attributes:['id','name']
            },{
                model:Airnumber
            },
        ]
        })
        res.status(200).json(fullParty);
    }catch(error){
        console.error(error);
        next(error);
    }
})

module.exports = router;