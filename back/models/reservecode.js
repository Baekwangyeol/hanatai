const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class reservecode extends Model {
    static init(sequelize) {
      return super.init({
        reservecode: {
          type: DataTypes.STRING
        },
      }, {
        modelName: 'reservecode',
        tableName: 'reservecodes',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Reservecode.belongsTo(db.Hanacode);
      db.Reservecode.hasMany(db.Reserveperson);
    }
  };
