const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Hotel extends Model {
    static init(sequelize) {
      return super.init({
        name: {
          type: DataTypes.STRING
        },
        Abbreviation: {
          type: DataTypes.STRING
        },
        star:{
          type:DataTypes.INTEGER,
        },
        src:{
          type: DataTypes.STRING(200)
        },
      }, {
        modelName: 'Hotel',
        tableName: 'hotels',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      });
    }
    static associate(db) {
      db.Hotel.belongsTo(db.Country);
      db.Hotel.belongsTo(db.Region);
      db.Hotel.belongsToMany(db.Contact, { through : db.hotels_contacts, as: 'HoteltoContact', foreignKey:'hotels_id'  }); 
      db.Hotel.hasMany(db.Roomtype);
    }
  };