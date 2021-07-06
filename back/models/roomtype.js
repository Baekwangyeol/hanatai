
const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Roomtype extends Model {
    static init(sequelize) {
      return super.init({
        name: {
          type: DataTypes.STRING
        },
        bath:{
          type: DataTypes.BOOLEAN
        },
        view:{
          type:DataTypes.STRING
        },
        numberOfRoom:{
          type: DataTypes.INTEGER
        },
        extrabed:{
          type:DataTypes.BOOLEAN
        },
      }, {
        modelName: 'Roomtype',
        tableName: 'roomtypes',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Roomtype.belongsTo(db.Hotel);
      db.Roomtype.hasMany(db.Roomprice);
      db.Roomtype.hasMany(db.Roomperson);
      db.Roomtype.hasMany(db.Roomtypereserve);
    }
  };