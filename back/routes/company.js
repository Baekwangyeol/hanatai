const express = require('express');
const router = express.Router();
const { Op } =require('sequelize');
const { Company, Region,Country, Contact ,OptionDetail } =require('../models');
const { isLoggedIn } =require('./middlewares');


router.get('/', isLoggedIn, async (req,res,next)=>{  
    try{
        const where ={};
        if(parseInt(req.query.lastId, 10 )){
            where.id ={ [ Op.lt ]: parseInt(req.query.lastId,10)};
        }

        const companys = await Company.findAll({
            where,
            limit:10,
            order:[
                ['createdAt','DESC'],
            ],include:[{
                model:Region,
                attributes:['id','region'],
            },{
                model:Country,
                attributes:['id','country'],
            },{
                model:Contact,
                attributes:['id','name','position','work'],
            },  {
                model: OptionDetail,
               as : 'Details'}]
        })

        res.status(200).json(companys);
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/', isLoggedIn, async (req,res,next) => {
    try{
        console.log(req.body);
        const company = await Company.create({
            company : req.body.company,
            CountryId: parseInt(req.body.country),
            RegionId: parseInt(req.body.region),
            address: req.body.address,
            business: req.body.business,
        })
        const fullCompany = await Company.findOne({
            where :{ id : company.id},
            include:[{
                model : Region,
            },{
                model: Country,
            }]
        })
        res.status(201).json(fullCompany)
    }catch(error){
        console.error(error);
        next(error);
    }
});


router.post('/:CompanyId/option', isLoggedIn , async (req, res, next) => {
    try{
        const company = await Company.findOne({
            where :{ id: parseInt(req.params.CompanyId) }
        })
        const option = await OptionDetail.findOne({
            where : { id : req.body.detail}
        })
        if(!company) {
            return res.status(403).send('존재하지않는 회사입니다.');
        }
        await company.addDetails(option, { through: { adult : req.body.adult, child: req.body.child}})

        const fullCompany = await company.getDetails({ where: { id:  req.body.detail }, });
        res.status(201).send(fullCompany[0]);
    }catch(error){
        console.error(error);
        next(error);
    }

})


module.exports = router;