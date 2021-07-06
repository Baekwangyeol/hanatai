const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Tel extends Model {
    static init(sequelize) {
      return super.init({
        tel: {
          type: DataTypes.STRING(50)
        },
      }, {
        modelName: 'Tel',
        tableName: 'tels',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Tel.belongsTo(db.Country); 
      db.Tel.belongsTo(db.Contact);
      db.Tel.belongsTo(db.User);   //belongsTo 1:다 관계일때 여기가 다인경우 
    }
  };