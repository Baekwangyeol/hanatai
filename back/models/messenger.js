const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Messenger extends Model {
    static init(sequelize) {
      return super.init({
        messenger: {
          type: DataTypes.STRING
        }
      }, {
        modelName: 'Messenger',
        tableName: 'messengers',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Messenger.hasMany(db.Account) // hasMany 1:다 관계중 1에 해당하는db에 hasMany
    }
  };