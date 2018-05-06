const Sequelize = require('sequelize');
const db = require('../index');

const Campus = db.define('campus', {
  name: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    notEmpty: true,
    },
    description: Sequelize.TEXT,
  }, {
    scopes: {
      populated: () => ({
        include: [{
          model: db.model('student'),
          as: 'student'
        }]
      })
    }
});

module.exports = Campus;
