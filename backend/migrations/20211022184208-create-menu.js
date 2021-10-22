'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Menus', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            menu_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            precio: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            imageUrl: {
                allowNull: true,
                type: Sequelize.STRING
            },
            restaurantId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Menus');
    }
};