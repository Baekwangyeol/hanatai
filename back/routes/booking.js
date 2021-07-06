const express = require('express');
const router = express.Router();
const { Op } =require('sequelize');
const dayjs = require('dayjs')
const { Hanacode,
       User,
       Reservecode,
       Reserveperson,
       Roomtypereserve,
       Roomtype,
       Hotel,
       Reserveoption,
       OptionDetail,
       Option } =require('../models');
const { isLoggedIn } =require('./middlewares');


router.get('/', isLoggedIn, async (req,res,next)=>{  
    try{
        const where ={};
        where.firstday = { [ Op.gte ]: new Date()};
        
        if(req.query.start){
            where.firstday = { [ Op.gte ]: req.query.start};
        }
        if(parseInt(req.query.lastId, 10 )){
            where.id ={ [ Op.gt ]: parseInt(req.query.lastId,10)};
        }
        if(req.query.status === 'check'){
            where.status = '예약체크';
        }
        if(req.query.status === 'confirm'){
            where.status = '확정';
        }
        if(req.query.end){
            where.lastday = {[ Op.lte ]: req.query.end };
        }
        if(req.query.search){
            where.code = req.query.search;
        }
        console.log(req.query); 
        const hanacodes = await Hanacode.findAll({
            where,
            limit:10,
            order:[
                ['firstday','ASC'],
            ],include:[{
                model:User,
                attributes:['id','name']
            }]
        })
        res.status(200).json(hanacodes);
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.get('/confirm', isLoggedIn, async (req,res,next) =>{
    try{
        const hanacodes = await Hanacode.findAll({
            where:{
                status:'확정',
                firstday : {
                        [ Op.gte] : dayjs().startOf('day').format(),
                },
                PartyId:null,
            }
        })
        console.log(hanacodes);
        res.status(200).json(hanacodes);
    }catch(error){
        console.error(error);
        next(error);
    }
})

router.get('/count', isLoggedIn, async (req,res,next)=>{
    try{
        // const where = {  status : '예약체크' }
        // console.log(new Date())
        // console.log(dayjs().startOf('day').format())
        // where.createdAt = { [ Op.gte ]  : dayjs().startOf('day').format(),
        //                     [ Op.lte ] : new Date(),  }
        const hanacodes = await Hanacode.count({
            where: { 
                createdAt: {
                            [ Op.gte ]  : dayjs().startOf('day').format(),
                            [ Op.lte ] : new Date()
                }
            },
        })
        // 오늘 시작 00시부터 지금까지의 시간 범위 구해서 count함
        res.status(200).json(hanacodes);
    }catch(error){
        console.error(error);
        next(error);
    }
})


router.post('/', isLoggedIn, async (req,res,next)=>{
    try{
        const code = await Hanacode.findOne({
            where : { code: req.body.hanacode }
        })
        if(code){
            return res.status(403).send('동일한 코드가 존재합니다. 검색을 이용하세요')
        }
        const hanacodes =await Hanacode.create({
            code:req.body.hanacode,
            firstday:req.body.startDate,
            lastday:req.body.endDate,
            UserId:req.user.id,
        })

        const fullHanacode = await Hanacode.findOne({
            where : { id : hanacodes.id},
            include:[{
                model:User,
                attributes:['id','name']
            }]
        })
        res.status(201).json(fullHanacode)
    }catch(error){
        console.error(error);
        next(error);
    }

});


router.post('/:bookingId/reservecode', isLoggedIn, async (req, res, next) =>{
    try{
        const hanacode = await Hanacode.findOne({
            where : {id: parseInt(req.params.bookingId) }
        });
        if(!hanacode){
            return res.status(403).send('존재하지않는 코드입니다.')
        }
        const hanacodes = await Reservecode.findOne({
            where : {reservecode: req.body.reservecode,}
        });
        if(hanacodes){
            return res.status(403).send('동일한 코드가 존재합니다.')
        }
        const reservecode = await Reservecode.create({
            reservecode:req.body.reservecode,
            HanacodeId:parseInt(req.params.bookingId),
        })

        const fullReservecode = await Reservecode.findOne({
            where: { id : reservecode.id },
            attributes:['id','reservecode'],
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
        })
        res.status(201).json(fullReservecode);
    } catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/:bookingId/people', isLoggedIn, async (req, res, next) =>{
    try{
        const reservecodes = await Reservecode.findOne({
            where : {id: parseInt(req.params.bookingId) }
        });
        if(!reservecodes){
            return res.status(403).send('존재하지않는 코드입니다.')
        }
        if(req.body.child ==='' && req.body.infant ===''){
            var people = await Reserveperson.create({
                representative:req.body.representative,
                adult:req.body.adult,
                reservecodeId:parseInt(req.params.bookingId),
            })
        }else if(req.body.infant === ''){
            var people = await Reserveperson.create({
                representative:req.body.representative,
                adult:req.body.adult,
                child:req.body.child,
                reservecodeId:parseInt(req.params.bookingId),
            })
        }else if(req.body.child === ''){
            var people = await Reserveperson.create({
                representative:req.body.representative,
                adult:req.body.adult,
                infant:req.body.infant,
                reservecodeId:parseInt(req.params.bookingId),
            })
        }else{
            var people = await Reserveperson.create({
                representative:req.body.representative,
                adult:req.body.adult,
                child:req.body.child,
                infant:req.body.infant,
                reservecodeId:parseInt(req.params.bookingId),
            })
        }

        const fullReserveperson = await Reserveperson.findOne({
            where: { id : people.id },
            include:[{
                model:Roomtypereserve
            },{
                model:Reserveoption
            }]
        })
        res.status(201).json(fullReserveperson);
    } catch(error){
        console.error(error);
        next(error);
    }
});


router.post('/:peopleId/reserveroom', isLoggedIn, async (req, res, next) =>{
    try{
        console.log(req.body);
        const reserveperson = await Reserveperson.findOne({
            where : {id: parseInt(req.params.peopleId) }
        });
        if(!reserveperson){
            return res.status(403).send('존재하지않는 코드입니다.')
        }
        console.log(parseInt(req.params.peopleId));
        const roomtypereserve = await Roomtypereserve.create({
            numberOfRoom:req.body.numberOfRoom,
            numberOfExtrabed:req.body.extrabed,
            numberOfExtraperson:req.body.extraPerson,
            checkInDate:req.body.startDate,
            checkOutDate:req.body.endDate,
            night:req.body.night,
            reservePersonId:parseInt(req.params.peopleId),
            RoomtypeId:parseInt(req.body.roomtype),
        })

        const fullRoomtypereserve = await Roomtypereserve.findOne({
            where: { id : roomtypereserve.id },
            include:[{
                model:Roomtype,
                include:[{
                    model:Hotel
                }]
            }]
        })
        res.status(201).json({fullRoomtypereserve, reservecodeId:reserveperson.reservecodeId});
    } catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/:peopleId/option', isLoggedIn, async (req,res,next) =>{
    try{
        const reserveperson = await Reserveperson.findOne({
            where : {id: parseInt(req.params.peopleId) }
        });
        if(!reserveperson){
            return res.status(403).send('존재하지않는 인원입니다.')
        }
        if(req.body.child === ''){
            var reserveoption = await Reserveoption.create({
                adult: req.body.adult,
                reservePersonId:parseInt(req.params.peopleId),
                OptionDetailId: req.body.detail,
            })
        }else if(req.body.adult === ''){
            var reserveoption = await Reserveoption.create({
                child: req.body.child,
                reservePersonId:parseInt(req.params.peopleId),
                OptionDetailId: req.body.detail,
            })
        }
        const fullreserveoption = await Reserveoption.findOne({
            where:{ id : reserveoption.id},
            include:[{
                model:OptionDetail,
                include:[{
                    model:Option
                }]
            }]
        })
        res.status(201).json({fullreserveoption,reservecodeId:reserveperson.reservecodeId});
    }catch(error) {
         console.error(error);
         next(error);
    }
})

router.patch('/:hanacodeId/codestatus', isLoggedIn, async (req,res,next)=>{
    try{
        const hanacode = await Hanacode.findOne({ where: { id : req.params.hanacodeId}})
        if(!hanacode){
            return res.status(400).send('존재하지 않는 코드입니다.');
        }
        await Hanacode.update({
            status: req.body.status,
        },{
            where: { id : hanacode.id },
        });
        res.status(200).json({ status: req.body.status })
    }catch(error){
        console.error(error);
        next(error);
    }

})

router.delete('/:roomReserve/:peopleId/reserveroom', isLoggedIn, async (req,res,next)=>{  //delete /1/1/reserveroom
    try{
        console.log(parseInt(req.params.peopleId));
        console.log(parseInt(req.params.roomReserve));
        const reserveperson = await Reserveperson.findOne({
            where : {id: parseInt(req.params.peopleId) }
        });

        if(!reserveperson){
            return res.status(403).send('존재하지않는 인원입니다.')
        }
        console.log(parseInt(req.params.peopleId));
        await Roomtypereserve.destroy({
            where:{
                id: parseInt(req.params.roomReserve),
                reservePersonId: parseInt(req.params.peopleId),
            }
        })
        res.status(200).json({PeopleId: parseInt(req.params.peopleId),
                              RoomtypeReserveId: parseInt(req.params.roomReserve),
                              ReservecodeId:reserveperson.reservecodeId })
    }catch(error){
        console.error(error);
        next(error);
    }

})


router.patch('/:peopleId/cod', isLoggedIn, async (req,res,next)=>{  //patch /1/reserveroom
    try{
        console.log(req.body);
        const reserveperson = await Reserveperson.findOne({
            where : {id: parseInt(req.params.peopleId) }
        });
        if(!reserveperson){
            return res.status(403).send('존재하지않는 인원입니다.')
        }
        await Roomtypereserve.update({
            COD:req.body.editcod
        },{
            where: { id : req.body.roomReserve }
        })
        res.status(200).json({PeopleId: parseInt(req.params.peopleId),
                              RoomtypeReserveId:req.body.roomReserve,
                              ReservecodeId:reserveperson.reservecodeId,
                              COD:req.body.editcod })
    }catch(error){
        console.error(error);
        next(error);
    }
})


router.patch('/:peopleId/othercode', isLoggedIn, async (req,res,next)=>{  //patch /1/reserveroom
    try{
        console.log(req.body);
        const reserveperson = await Reserveperson.findOne({
            where : {id: parseInt(req.params.peopleId) }
        });
        if(!reserveperson){
            return res.status(403).send('존재하지않는 인원입니다.')
        }
        await Roomtypereserve.update({
            othercode:req.body.otherCode
        },{
            where: { id : req.body.roomReserve }
        })
        res.status(200).json({PeopleId: parseInt(req.params.peopleId),
                              RoomtypeReserveId:req.body.roomReserve,
                              ReservecodeId:reserveperson.reservecodeId,
                              othercode:req.body.otherCode })
    }catch(error){
        console.error(error);
        next(error);
    }
})

router.get('/:bookingId', isLoggedIn,async (req,res,next)=>{ //GET /hotel/1
    try{
        const booking = await Hanacode.findOne({
            where : {id: parseInt(req.params.bookingId) },
        });
        if(!booking){
            return res.status(404).send('존재하지 않는 게시물입니다.')
        }
    
        const fullBooking = await Hanacode.findOne({
            where : {id : booking.id },
            include:[{
                model:Reservecode,
                attributes:['id','reservecode'],
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
        })
        res.status(200).json(fullBooking);
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;