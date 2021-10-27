'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Restaurants', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            restaurant_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            ubication: {
                allowNull: false,
                type: Sequelize.STRING
            },
            open_time: {
                allowNull: true,
                type: Sequelize.DATE
            },
            close_time: {
                allowNull: true,
                type: Sequelize.DATE
            },
            imageUrl: {
                allowNull: true,
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Restaurants');
    }
};