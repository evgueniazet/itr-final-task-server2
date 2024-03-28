"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const categories = sequelize.define('categories', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return categories;
};
//# sourceMappingURL=categories.js.map