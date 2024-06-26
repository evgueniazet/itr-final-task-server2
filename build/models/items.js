"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const items = sequelize.define('items', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        collectionId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tags: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        custom_int1: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        custom_int2: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        custom_int3: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        custom_string1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_string2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_string3: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_text1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_text2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_text3: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_boolean1: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        custom_boolean2: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        custom_boolean3: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        custom_date1: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        custom_date2: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        custom_date3: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    });
    return items;
};
//# sourceMappingURL=items.js.map