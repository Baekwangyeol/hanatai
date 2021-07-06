const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
    static  init(sequelize){
        return super.init({  
            email: { 
                    type: DataTypes.STRING(30),
                    allowNull: false,  //필수여부 false 면 필수
                    unique: true,  //고유한값
            },//컬럼 실제 데이터는 로우
            name:{
                type: DataTypes.STRING(30),
                allowNull: false, 
            },
            nickname: {
                    type: DataTypes.STRING(30),
                    allowNull: false, 
            },
            password:{
                    type: DataTypes.STRING(100),
                    allowNull: false, 
            },
            role:{
              type: DataTypes.STRING(20),
              defaultValue: 'bronze',
            },
            position:{
                type:DataTypes.STRING(20),
              },
              profileimage:{
                type:DataTypes.STRING(200),
              },
        },{
            modelName:'User',
            tableName:'users',
            timestamps: true,
            paranoid: true,
            charset:'utf8',
            collate:'utf8_general_ci',
            sequelize,
        })
    }
    static associate(db){
        db.User.hasMany(db.Account); 
        db.User.hasMany(db.Tel); 
        db.User.hasMany(db.Hanacode);
        db.User.hasMany(db.Party);
    }
};