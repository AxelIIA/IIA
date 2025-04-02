const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelizeClient = require('../sequelizeClient');
const sqlClient = require('../sequelizeClient');

class User extends Model { }

User.init({
firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value){
        this.setDataValue('firstName', 
                value.charAt(0).toUpperCase()
                +
                value.slice(1).toLowerCase()
            )
    }
},
lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value){
        this.setDataValue('lastName', 
                value.charAt(0).toUpperCase()
                +
                value.slice(1).toLowerCase()
            )
    }
},
email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
},
password:{
    type: DataTypes.STRING,
    allowNull: false,
    set(value){
        this.setDataValue('password', bcrypt.hashSync(value, 10))
    }
},
role: {
    type: DataTypes.ENUM(["user", "admin"]),
    defaultValue: "user",
    allowNull: false
}
}, {
    sequelize: sqlClient,
    modelName: 'User',
    hooks: {
        beforeCreate(attrs){
            console.log('-------------------------------')
            console.log('[data before creation]', attrs)
            console.log('-------------------------------')
        }
    }
})

//  async function synchroWithDb(){
//      await User.sync({
//          alter: true
//      })
//  }
// synchroWithDb()

module.exports = User