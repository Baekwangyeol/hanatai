const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class roomPerson extends Model {
    static init(sequelize) {
      return super.init({
        adult: {
          type: DataTypes.INTEGER
        },
        child: {
          type: DataTypes.INTEGER
        },
        infant: {
          type: DataTypes.INTEGER
        },
      }, {
        modelName: 'roomPerson',
        tableName: 'roompeople',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Roomperson.belongsTo(db.Roomtype);
    }
  };