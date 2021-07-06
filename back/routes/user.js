const express= require('express');
const { User } =require('../models');
const router = express.Router();
const bcrypt =require('bcrypt');
const passport =require('passport');
const { isLoggedIn, isNotLoggedIn }= require('./middlewares');


router.get('/', async (req,res,next)=>{
    console.log(req.headers);
    try{
        if(req.user){
            const fullUserWithoutPassword = await User.findOne({
                where:{id : req.user.id},
                attributes: {
                    exclude: ['password']
                  },
            })
            res.status(200).json(fullUserWithoutPassword);   
        }else{
            res.status(200).json(null);
        }     
    }catch(error){
        console.error(error);
        next(error);
    }

})

router.get('/guide', isLoggedIn, async (req,res,next) =>{
    try{
        const guideInfo = await User.findAll({
            where:{
                position: 'guide',
            },
             attributes: ['id','name']
        })
        res.status(201).json(guideInfo);
    }catch(error){
        console.error(error);
        next(error);
    }
})

router.post('/signup', async (req,res,next) => {
    try{
        const exUser = await User.findOne({
            where:{
                email: req.body.email,
            }
        });
        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashPassword = await bcrypt.hash(req.body.password,10);
        await User.create({
            email: req.body.email,
            nickname:req.body.nickname,
            password:hashPassword,
            name:req.body.name,
            position:req.body.position,
        })
        res.status(201).send('ok');
    }catch(error){
        console.log(error);
        next(error);
    }
})



router.post('/login',isNotLoggedIn, (req, res, next) =>{
    passport.authenticate('local',(err, user, info)=>{
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            console.log(info.reason);
            return res.status(403).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where:{ id : user.id},
                attributes: {
                    exclude: ['password'] //가져오는것중제외항목
                  },
            })
            return res.status(200).json(fullUserWithoutPassword);
        })
    })(req,res,next);  //미들웨어 확장법 req,res,next를 못썻는데 이렇게하면가능
});

router.post('/logout',isLoggedIn, (req,res,next)=>{
    req.logout();
    req.session.destroy();
    res.send('ok');
});

module.exports = router;