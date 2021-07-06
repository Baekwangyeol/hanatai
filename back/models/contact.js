const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Contact extends Model {
    static init(sequelize) {
      return super.init({
        name: {
          type: DataTypes.STRING
        },
        gender: {
          type: DataTypes.STRING
        },
        position:{
          type:DataTypes.STRING,
        },
        email:{
          type:DataTypes.STRING,
        },
        work:{
          type:DataTypes.STRING,
        },
      }, {
        modelName: 'Contact',
        tableName: 'contacts',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Contact.belongsTo(db.Company);
      db.Contact.hasMany(db.Account);
      db.Contact.hasMany(db.Tel);
      db.Contact.belongsToMany(db.Hotel, { through : db.hotels_contacts, as : 'ContactToHotel',  foreignKey:'contact_Id'   });
    }
  };