const Sequelize = require('sequelize');
const db = require('../index');



const Student = db.define('student', {
  firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    },
  fullName: {
        type: Sequelize.VIRTUAL,
        get () {
            return this.firstName + ' ' + this.lastName;
        }
    },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  gpa: Sequelize.DECIMAL(0.0, 4.0),
  photo: {
    type : Sequelize.STRING,
    defaultValue : '/images/astro_person.jpeg'
    }
  }, {
    scopes: {
      populated: () => ({
        include: [{
          model: db.model('campus'),
        }]
      })
    }
});

module.exports = Student;
