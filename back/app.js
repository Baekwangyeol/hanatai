const express = require('express');
const cors  =require('cors');
const app = express();
const passportConfig = require('./passport');
const passport = require('passport');
const session =require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan =require('morgan');
const db = require('./models');
const path =require('path');

const userRouter = require('./routes/user');
const hotelRouter = require('./routes/hotel');
const airplaneRouter = require('./routes/airplane');
const addotherRouter =require('./routes/addother');
const companyRouter =require('./routes/company');
const contactRouter =require('./routes/contact');
const bookingRouter =require('./routes/booking');
const optionRouter = require('./routes/option');
const partyRouter = require('./routes/party');
const busRouter = require('./routes/bus');

dotenv.config();

db.sequelize.sync()
    .then(()=>{
        console.log("DB연결 성공");
    }).catch(console.error);
    passportConfig();

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3060',
    credentials:true,
}));
app.use(express.static(path.join(__dirname,'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended :true }));  //body-parser 대신이것들씀
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/hotel', hotelRouter);
app.use('/airplane', airplaneRouter);
app.use('/addother', addotherRouter);
app.use('/company', companyRouter);
app.use('/contact', contactRouter);
app.use('/booking', bookingRouter);
app.use('/option',optionRouter);
app.use('/party', partyRouter);
app.use('/bus',busRouter);

app.listen(3065,() =>{
    console.log('서버 실행중');
})

