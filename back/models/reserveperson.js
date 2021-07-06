const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class reservePerson extends Model {
    static init(sequelize) {
      return super.init({
        representative:{
          type: DataTypes.STRING
        },
        adult: {
          type: DataTypes.INTEGER,
          defaultValue: '0',
        },
        child:{
          type: DataTypes.INTEGER,
          defaultValue: '0',
        },
        infant:{
          type: DataTypes.INTEGER,
          defaultValue: '0',
        },
      }, {
        modelName: 'reservePerson',
        tableName: 'reservepeople',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Reserveperson.belongsTo(db.Reservecode);
      db.Reserveperson.hasMany(db.Reserveoption);
      db.Reserveperson.hasMany(db.Roomtypereserve);
    }
  };
