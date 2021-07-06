const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Op} =require('sequelize');
const fs = require('fs');
const { Hotel, Region, Country,Company,Contact,Roomtype,Roomprice } =require('../models');
const { isLoggedIn } =require('./middlewares');

try{
    fs.accessSync('uploads');
}catch(error){
    console.log('uploads 폴더가 없으므로 생성합니다.')
    fs.mkdirSync('uploads');
}
const upload = multer({
    storage : multer.diskStorage({  //어디에 저장할건지 
        destination(req,file,done){
            done(null, 'uploads');
        },
        filename(req,file,done){
            const ext = path.extname(file.originalname); //확장자추출(.png)
            const basename = path.basename(file.originalname, ext); //파일이름 추출
            done(null, basename + '_' + new Date().getTime() + ext); //파일이름4545354.png
        }
    }),
    limits:{ fileSize :20 * 1024*1024 }, //20MB
})



router.get('/', isLoggedIn, async (req,res,next)=>{  
    try{
        const where ={};
        if(parseInt(req.query.lastId, 10 )){
            where.id ={ [ Op.lt ]: parseInt(req.query.lastId,10)};
        }
        const hotels = await Hotel.findAll({
            where,
            limit:10,
            order:[
                ['createdAt','DESC'],
            ],include:[{
                model:Region,
                attributes:['id','region']
            },{
                model:Country,
                attributes:['id','country'],
            }],
        })

        res.status(200).json(hotels);
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/', isLoggedIn, upload.none(), async (req,res,next) => {
    try{
        const hotel = await Hotel.create({
            name : req.body.hotel,
            Abbreviation: req.body.initials,
            star: req.body.star,
            src:req.body.image, 
            CountryId: parseInt(req.body.country),
            RegionId: parseInt(req.body.region),
        })
        // const fullHotel = await Hotel.findOne({
        //     where :{ id : hotel.id},
        //     include:[{
        //         model : Region,
        //     },{
        //         model:Country,
        //     }]
        // })
        res.status(201).send('등록성공')
    }catch(error){
        console.error(error);
        next(error);
    }
});



router.post('/image',isLoggedIn, upload.single('image'), async (req,res,next)=>{
    console.log('image'+req.file.filename);
    res.json(req.file.filename);
});

router.post('/:hotelId/contact', isLoggedIn, async (req, res, next) =>{
    try{
        console.log(req.body.company);
        console.log(req.params.hotelId);
        const hotel = await Hotel.findOne({
            where : {id: parseInt(req.params.hotelId) }
        });
        if(!hotel){
            return res.status(403).send('존재하지않는 게시물입니다.')
        }
        await hotel.addHoteltoContact(req.body.contact);
        res.status(200).json({ContactId: req.body.contact})

    } catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/:hotelId/roomtype', isLoggedIn, async (req, res, next) =>{
    try{
        const hotel = await Hotel.findOne({
            where : {id: parseInt(req.params.hotelId) }
        });
        if(!hotel){
            return res.status(403).send('존재하지않는 호텔입니다.')
        }
        const roomtype = await Roomtype.create({
            name:req.body.name,
            bath:req.body.bath,
            view:req.body.view,
            numberOfRoom: req.body.numberOfRoom,
            extrabed:req.body.extrabed,
            HotelId:parseInt(req.params.hotelId),
        })
        const fullRoomtype = await Roomtype.findOne({
            where: { id : roomtype.id },
        })
        res.status(201).json(fullRoomtype);
    } catch(error){
        console.error(error);
        next(error);
    }
});


router.post('/:roomtypeId/price', isLoggedIn, async (req, res, next) =>{
    try{
        const roomtype = await Roomtype.findOne({
            where : {id: parseInt(req.params.roomtypeId) }
        });
        if(!roomtype){
            return res.status(403).send('존재하지않는 룸타입입니다.')
        }
        const roomprice = await Roomprice.create({
            room:req.body.roomPrice,
            extrabed:req.body.extraBed,
            extraperson:req.body.extraPerson,
            periodstart: req.body.periodStart,
            periodend:req.body.periodEnd,
            RoomtypeId:parseInt(req.params.roomtypeId),
        })
        const fullRoomprice = await Roomprice.findOne({
            where: { id : roomprice.id },
        })
        res.status(201).json(fullRoomprice);
    } catch(error){
        console.error(error);
        next(error);
    }
});


router.get('/:hotelId', async (req,res,next)=>{ //GET /hotel/1
    try{
        const hotel = await Hotel.findOne({
            where : {id: parseInt(req.params.hotelId) },
        });
        if(!hotel){
            return res.status(404).send('존재하지 않는 게시물입니다.')
        }
    
        const fullHotel = await Hotel.findOne({
            where : {id : hotel.id },
            include:[{
                model:Region
            },
            {
                model:Country
            },{
                model:Contact,
                as:'HoteltoContact',
                attributes:['id','name'],
                include:[{
                    model:Company,
                    attributes:['id','company'],
                }]
            },{
                model:Roomtype,
                include:[{
                    model:Roomprice,
                }]
            }]
        })
        res.status(200).json(fullHotel)
    }catch(error){
        console.error(error);
        next(error);
    }
});




module.exports = router;