const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Bus extends Model {
    static init(sequelize) {
      return super.init({
        bus: {
          type: DataTypes.STRING
        },
      }, {
        modelName: 'Bus',
        tableName: 'buses',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
    }
  };