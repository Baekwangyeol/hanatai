const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class company_optiondetail extends Model {
  static init(sequelize){
    return super.init({
      adult: {
        type: DataTypes.INTEGER
      },
      child:{
        type: DataTypes.INTEGER
      },
    },{
      modelName: 'company_optiondetail',
      tableName: 'company_optiondetails',
      timestamps: false, 
      completed: true,
      charset: 'utf8',
      collate: 'utf8_general_ci', 
      sequelize,
    })
  }
  static associate(db) {
  }
}