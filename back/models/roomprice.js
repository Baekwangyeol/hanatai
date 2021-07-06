const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Roomprice extends Model {
    static init(sequelize) {
      return super.init({
        room: {
          type: DataTypes.INTEGER
        },
        extrabed:{
          type: DataTypes.INTEGER
        },
        extraperson:{
          type: DataTypes.INTEGER
        },
        periodstart:{
          type: DataTypes.DATE
        },
        periodend:{
          type: DataTypes.DATE
        },
        status:{
          type: DataTypes.STRING,
          defaultValue: '사용중',
        },
      }, {
        modelName: 'Roomprice',
        tableName: 'roomprices',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Roomprice.belongsTo(db.Roomtype);
    }
  };