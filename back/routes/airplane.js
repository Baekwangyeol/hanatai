const express= require('express');
const { Airplane,Airnumber } =require('../models');
const router = express.Router();
const { Op} =require('sequelize');
const { isLoggedIn, isNotLoggedIn }= require('./middlewares');

router.post('/',isLoggedIn, async (req,res,next)=>{
    try{
        const airplaneCheck = await Airplane.findOne({
            where : { name: req.body.name, }
        });
        if(airplaneCheck){
            return res.status(403).send('등록된 항공입니다.')
        }
        const airPlane = await Airplane.create({
            name : req.body.name,
            code: req.body.code,
          })
          const fullPost = await Airplane.findOne({
              where : {id : airPlane.id },
              include:[{
                model:Airnumber,
            }],
          })
          res.status(201).json(fullPost)
    }catch(error){
        console.error(error);
        next(error);
    }
});


router.get('/', async (req,res,next)=>{
    try{
      const where={};
      if(parseInt(req.query.lastId,10)){//초기로딩이 아닐떄
        where.id = { [Op.lt] : parseInt(req.query.lastId,10)};
      }
    const airPlane = await Airplane.findAll({
        where,
        limit:10,
        order:[
            [ 'createdAt', 'DESC' ],
        ],
        include:[{
            model:Airnumber,
        }],
      
        }        
        //limit :10,  <--10개만 가져와라
        //offset:0,  <--1~10  offset:10 <--11~20 가져오라는것
        //치명적결함 들고오는도중 추가하거나 삭제하면 그거를 포함해서 10개를 다시세기때문에
        // 하나가 비거나 하나가 중복되거나 하는 상황이 발생함
        //order:[[ 'createdAt', 'DESC' ]] 최신게시물부터 들고오는법 옛날꺼부터하려면 'ASC'
        //그래서 limit 과 lastId 방식을 많이사용함
    );
    res.status(200).json(airPlane);

    }catch(error){
        console.error(error);
        next(error);
    }
});


router.post('/:airplaneId/number', isLoggedIn, async (req, res, next) =>{
    try{
        const airplaneCheck = await Airplane.findOne({
            where : { id: parseInt(req.params.airplaneId) }
        });
        if(!airplaneCheck){
            return res.status(403).send('존재하지않는 항공입니다.')
        }
        const airplanenumberCheck = await Airnumber.findOne({
            where : { number:req.body.flight }
        });
        if(airplanenumberCheck){
            return res.status(403).send('존재하는 항공번호입니다.')
        }
        const airnumber = await Airnumber.create({
            number:req.body.flight,
            departureTime:req.body.departureTime,
            arriveTime:req.body.arriveTime,
            departureSpace: req.body.departureSpace,
            arriveSpace:req.body.arriveSpace,
            AirplaneId:parseInt(req.params.airplaneId),
        })
        const fullAirnumber = await Airnumber.findOne({
            where: { id : airnumber.id },
        })
        res.status(201).json(fullAirnumber);
    } catch(error){
        console.error(error);
        next(error);
    }
});

router.get('/:code', isLoggedIn, async (req, res, next) =>{
    try{
        console.log(req.params.code);
        const airplaneCheckCode = await Airplane.findOne({
            where : { code: req.params.code, }
        });
        console.log(airplaneCheckCode);
        const fullAirnumber = await Airnumber.findAll({
            where: { airplaneId : airplaneCheckCode.id },
        });
        res.status(201).json(fullAirnumber);
    }catch(error){
        console.error(error);
        next(error);
    }

})
module.exports = router;