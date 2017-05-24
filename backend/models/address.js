'use strict'
let valmsg =  require('../helpers/validationMessages.js')

module.exports = function(sequelize, DataTypes) {
  const Address = sequelize.define('Address', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        len: {
          args: [1, 45],
          msg: valmsg.len(1, 45)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        len: {
          args: [1, 45],
          msg: valmsg.len(1, 45)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    telephone: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        len: {
          args: [1, 45],
          msg: valmsg.len(1, 45)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
        phone(value){
          valmsg.phone(value)
        }
      }
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: valmsg.len(1, 255)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    street2: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        len: {
          args: [1, 255],
          msg: valmsg.len(1, 255)
        },
      }
    },
    city: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: {
          args: [1, 60],
          msg: valmsg.len(1, 60)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    state: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: {
          args: [1, 60],
          msg: valmsg.len(1, 60)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    zipcode: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: {
          args: [1, 60],
          msg: valmsg.len(1, 60)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    country: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: 'Mexico'
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'addresses'
  });

  return Address
};
