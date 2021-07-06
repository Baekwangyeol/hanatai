const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class hotels_contacts extends Model {
    static init(sequelize) {
      return super.init({
        hotels_id: {
          type: DataTypes.INTEGER
        },
        contact_Id:{
          type:DataTypes.INTEGER
        },
      }, {
        modelName: 'hotels_contacts',
        tableName: 'hotels_contacts',
        timestamps: false, 
        completed: true,
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    
    static associate(db) {
        db.hotels_contacts.belongsTo(db.Hotel,{  foreignKey:'hotels_id' });
        db.hotels_contacts.belongsTo(db.Contact, {  foreignKey:'contact_Id' });
    }
  };