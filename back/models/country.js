const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Country extends Model {
    static init(sequelize) {
      return super.init({
        country: {
          type: DataTypes.STRING(10),
        }
      }, {
        modelName: 'Country',
        tableName: 'countries',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Country.hasMany(db.Hotel);
      db.Country.hasMany(db.Company);
      db.Country.hasMany(db.Tel);
    }
  };