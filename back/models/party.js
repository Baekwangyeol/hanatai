const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Party extends Model {
  static init(sequelize){
    return super.init({
      party: {
        type: DataTypes.STRING
      },
      startdate : {
        type: DataTypes.DATE
      },
    },{
      modelName: 'Party',
      tableName: 'parties',
      charset: 'utf8',
      collate: 'utf8_general_ci', 
      sequelize,
    })
  }
  static associate(db) {
    db.Party.hasMany(db.Hanacode);
    db.Party.belongsTo(db.User);
    db.Party.belongsTo(db.Airnumber);
  }
}