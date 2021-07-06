const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Airplane extends Model {
    static init(sequelize) {
      return super.init({
        name: {
          type: DataTypes.STRING(10),
        },
        code:{
          type: DataTypes.STRING(10),
        },
      }, {
        modelName: 'Airplane',
        tableName: 'airplanes',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Airplane.hasMany(db.Airnumber);
    }
  };