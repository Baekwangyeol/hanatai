const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Hanacode extends Model {
    static init(sequelize) {
      return super.init({
        code: {
          type: DataTypes.STRING
        },
        firstday:{
          type: DataTypes.DATE
        },
        lastday:{
          type: DataTypes.DATE
        },
        status:{
          type: DataTypes.STRING,
          defaultValue: '예약체크',
        },
      }, {
        modelName: 'Hanacode',
        tableName: 'hanacodes',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Hanacode.hasMany(db.Reservecode);
      db.Hanacode.belongsTo(db.User);
      db.Hanacode.belongsTo(db.Party);
    }
  };