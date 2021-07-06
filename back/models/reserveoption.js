const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class reserveOption extends Model {
    static init(sequelize) {
      return super.init({
        adult: {
          type: DataTypes.INTEGER, 
          defaultValue: '0',
        },
        child:{
          type: DataTypes.INTEGER,
          defaultValue: '0',
        },
      }, {
        modelName: 'reserveOption',
        tableName: 'reserveoptions',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Reserveoption.belongsTo(db.OptionDetail)
      db.Reserveoption.belongsTo(db.Reserveperson)
    }
  };
