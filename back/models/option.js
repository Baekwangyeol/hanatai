const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Option extends Model {
  static init(sequelize){
    return super.init({
      option:{
        type: DataTypes.STRING,
      },
      content:{
        type: DataTypes.STRING(300),
      }
    },{
      modelName: 'Option',
      tableName: 'options',
      charset: 'utf8',
      collate: 'utf8_general_ci', 
      sequelize,
    })
  }
  static associate(db) {
    db.Option.hasMany(db.OptionDetail)
  }
}