const Sequelize = require('sequelize');
const user = require('./user');
const airplane = require('./airplane');
const country = require('./country');
const region = require('./region');
const hotel = require('./hotel');
const messenger = require('./messenger');
const company =require('./company');
const contact = require('./contact');
const account =require('./account');
const tel =require('./tel');
const hotels_contacts =require('./hotels_contacts');
const airnumber = require('./airnumber');
const roomtype = require('./roomtype');
const roomprice = require('./roomprice');
const roomperson = require('./roomperson');
const hanacode = require('./hanacode');
const reservecode = require('./reservecode');
const reserveperson = require('./reserveperson');
const roomtypereserve =require('./roomtypereserve');
const option =require('./option');
const optiondetail = require('./optiondetail');
const company_optiondetail = require('./company_optiondetail');
const reserveoption = require('./reserveoption');
const party = require('./party');
const bus = require('./bus');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);


db.User = user;
db.Airplane = airplane;
db.Country = country;
db.Region = region;
db.Hotel = hotel;
db.Messenger = messenger;
db.Company = company;
db.Contact = contact;
db.Account = account;
db.Tel = tel;
db.hotels_contacts = hotels_contacts;
db.Airnumber=airnumber;
db.Roomtype=roomtype;
db.Roomprice=roomprice;
db.Roomperson= roomperson;
db.Hanacode = hanacode;
db.Reservecode = reservecode;
db.Reserveperson= reserveperson;
db.Roomtypereserve = roomtypereserve;
db.Option = option;
db.OptionDetail =optiondetail;
db.company_optiondetail = company_optiondetail;
db.Reserveoption = reserveoption;
db.Party = party;
db.Bus = bus;

Object.keys(db).forEach(modelName =>{
  db[modelName].init(sequelize);
})


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;