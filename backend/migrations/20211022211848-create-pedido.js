'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Pedidos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            monto: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            time_pedido: {
                allowNull: true,
                type: Sequelize.DATE
            },
            pedidosId: {
                allowNull: false,
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
            permiso_user: {
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
        await queryInterface.dropTable('Pedidos');
    }
};