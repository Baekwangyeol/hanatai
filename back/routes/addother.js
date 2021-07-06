const express= require('express');
const { Country,Region, Messenger } =require('../models');
const router = express.Router();
const { Op } =require('sequelize');
const { isLoggedIn, isNotLoggedIn }= require('./middlewares');


router.get('/region', async (req,res,next)=>{
    try{
        const where={};
        if(parseInt(req.query.lastId,10)){//초기로딩이 아닐떄
          where.id = { [Op.lt] : parseInt(req.query.lastId,10)};
        }
      const region = await Region.findAll({
          where,
          limit:10,
          order:[
              [ 'createdAt', 'DESC' ],
          ],
        
          }        
      );
      res.status(200).json(region);
    }catch(error){
        console.error(error);
        next(error);
    }
})


router.get('/country', async (req,res,next)=>{
    try{
        const where={};
        if(parseInt(req.query.lastId,10)){//초기로딩이 아닐떄
          where.id = { [Op.lt] : parseInt(req.query.lastId,10)};
        }
      const country = await Country.findAll({
          where,
          limit:10,
          order:[
              [ 'createdAt', 'DESC' ],
          ],
        
          }        
          //limit :10,  <--10개만 가져와라
          //offset:0,  <--1~10  offset:10 <--11~20 가져오라는것
          //치명적결함 들고오는도중 추가하거나 삭제하면 그거를 포함해서 10개를 다시세기때문에
          // 하나가 비거나 하나가 중복되거나 하는 상황이 발생함
          //order:[[ 'createdAt', 'DESC' ]] 최신게시물부터 들고오는법 옛날꺼부터하려면 'ASC'
          //그래서 limit 과 lastId 방식을 많이사용함
      );
      res.status(200).json(country);
    }catch(error){
        console.error(error);
        next(error);
    }
})


router.get('/messenger', async (req,res,next)=>{
    try{
        const where={};
        if(parseInt(req.query.lastId,10)){//초기로딩이 아닐떄
          where.id = { [Op.lt] : parseInt(req.query.lastId,10)};
        }
      const messenger = await Messenger.findAll({
          where,
          limit:10,
          order:[
              [ 'createdAt', 'DESC' ],
          ],
        
          }        
          //limit :10,  <--10개만 가져와라
          //offset:0,  <--1~10  offset:10 <--11~20 가져오라는것
          //치명적결함 들고오는도중 추가하거나 삭제하면 그거를 포함해서 10개를 다시세기때문에
          // 하나가 비거나 하나가 중복되거나 하는 상황이 발생함
          //order:[[ 'createdAt', 'DESC' ]] 최신게시물부터 들고오는법 옛날꺼부터하려면 'ASC'
          //그래서 limit 과 lastId 방식을 많이사용함
      );
      res.status(200).json(messenger);
    }catch(error){
        console.error(error);
        next(error);
    }
})



router.post('/country', async (req,res,next) => {
    try{
        const countrybefore = await Country.findOne({
            where:{
                country: req.body.addother,
            }
        });
        if(countrybefore){
            return res.status(403).send('이미 등록되어있는 나라입니다.');
        }
        const country = await Country.create({
            country: req.body.addother,
        })
        const fullPost = await Country.findOne({
            where : {id : country.id },
        })
        res.status(201).json(fullPost);
    }catch(error){
        console.log(error);
        next(error);
    }
})



router.post('/region', async (req,res,next) => {
    try{
        const regionbefore = await Region.findOne({
            where:{
                region: req.body.addother,
            }
        });
        if(regionbefore){
            return res.status(403).send('이미 등록되어있는 나라입니다.');
        }
        const region = await Region.create({
            region: req.body.addother,
        })
        const fullPost = await Region.findOne({
            where : {id : region.id },
        })
        res.status(201).json(fullPost);
    }catch(error){
        console.log(error);
        next(error);
    }
})





router.post('/messenger', async (req,res,next) => {
    try{
        console.log(req.body.addother)
        const messengerbefore = await Messenger.findOne({
            where:{
                messenger: req.body.addother,
            }
        });
        console.log(messengerbefore);
        if(messengerbefore){
            return res.status(403).send('이미 등록되어있는 메신저입니다.');
        }
        const messenger = await Messenger.create({
            messenger: req.body.addother,
        })
        const fullPost = await Messenger.findOne({
            where : {id : messenger.id },
        })
        res.status(201).json(fullPost);
    }catch(error){
        console.log(error);
        next(error);
    }
})

router.delete('/country/:id',isLoggedIn, async (req,res,next)=>{
    try{
        await Country.destroy({
            where : { 
                id : req.params.id,
            },
        //db에서 삭제
        })
        res.status(200).json({ CountryId : parseInt(req.params.id)})
    }catch(error){
        console.error(error);
        next(error);
    }

})



module.exports = router;