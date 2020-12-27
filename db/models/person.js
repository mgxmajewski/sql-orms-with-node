const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Person extends Sequelize.Model {}
    Person.init({
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Provide valid "firstName"',
                },
                notEmpty: {
                    msg: 'Provide valid "firstName"',
                },
            },
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Provide valid "firstName"',
                },
                notEmpty: {
                    msg: 'Provide valid "firstName"',
                },
            },
        },
    }, {
        sequelize
    });

    return Person;
};