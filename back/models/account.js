const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Account extends Model {
    static init(sequelize) {
      return super.init({
        account: {
          type: DataTypes.STRING
        },
      }, {
        modelName: 'Account',
        tableName: 'accounts',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Account.belongsTo(db.Messenger); 
      db.Account.belongsTo(db.Contact);
      db.Account.belongsTo(db.User);   //belongsTo  1:다 관계시 사용  EX)user 한명이 account 여러개 사용이라면 user는 hasMany account는 belongsTo
    }
  };