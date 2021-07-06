const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Company extends Model {
    static init(sequelize) {
      return super.init({
        company: {
          type: DataTypes.STRING
        },
        address: {
          type: DataTypes.STRING
        },
        business:{
          type:DataTypes.STRING,
        },
      }, {
        modelName: 'Company',
        tableName: 'companies',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Company.belongsTo(db.Region);
      db.Company.belongsTo(db.Country);
      db.Company.hasMany(db.Contact);
      db.Company.belongsToMany(db.OptionDetail, { through : db.company_optiondetail , as:'Details' });
    }
  };