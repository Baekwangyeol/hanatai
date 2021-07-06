const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Airnumber extends Model {
    static init(sequelize) {
      return super.init({
        number:{
          type: DataTypes.STRING(20),
        },
        departureTime:{
          type: DataTypes.STRING(20),
        },
        arriveTime:{
          type: DataTypes.STRING(20),
        },
        departureSpace:{
          type: DataTypes.STRING(20),
        },
        arriveSpace:{
          type: DataTypes.STRING(20),
        },
      }, {
        modelName: 'airnumber',
        tableName: 'airnumbers',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Airnumber.belongsTo(db.Airplane);
      db.Airnumber.hasMany(db.Party);
    }
  };