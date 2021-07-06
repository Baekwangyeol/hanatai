const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Region extends Model {
    static init(sequelize) {
      return super.init({
        region: {
          type: DataTypes.STRING(10),
        }
      }, {
        modelName: 'Region',
        tableName: 'regions',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Region.hasMany(db.Hotel);
      db.Region.hasMany(db.Company);
    }
  };