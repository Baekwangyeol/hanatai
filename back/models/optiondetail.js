const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class OptionDetail extends Model {
  static init(sequelize){
    return super.init({
      detail:{
        type: DataTypes.STRING,
      },
      adult: {
        type: DataTypes.INTEGER
      },
      child:{
        type: DataTypes.INTEGER
      },
    },{
      modelName: 'OptionDetail',
      tableName: 'optiondetails',
      charset: 'utf8',
      collate: 'utf8_general_ci', 
      sequelize,
    })
  }
  static associate(db) {
    db.OptionDetail.belongsTo(db.Option);
    db.OptionDetail.hasMany(db.Reserveoption);
    db.OptionDetail.belongsToMany(db.Company, { through : db.company_optiondetail , as :'OpCompany'});
  }
}