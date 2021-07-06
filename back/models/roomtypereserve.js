const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class roomtypeReserve extends Model {
    static init(sequelize) {
      return super.init({
        numberOfRoom: {
          type: DataTypes.INTEGER
        },
        numberOfExtrabed:{
          type: DataTypes.INTEGER
        },
        numberOfExtraperson:{
          type: DataTypes.INTEGER
        },
        checkInDate:{
          type: DataTypes.DATE
        },
        checkOutDate:{
          type: DataTypes.DATE
        },
        COD:{
          type: DataTypes.DATE
        },
        status:{
          type: DataTypes.STRING,
          defaultValue: '예약체크',
        },
        night:{
          type: DataTypes.INTEGER,
        },
        othercode:{
          type: DataTypes.STRING,
        },
      }, {
        modelName: 'roomtypeReserve',
        tableName: 'roomtypereserves',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Roomtypereserve.belongsTo(db.Reserveperson);
      db.Roomtypereserve.belongsTo(db.Roomtype);
    }
  };
