"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("module-alias/register");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const config_1 = tslib_1.__importDefault(require("config/config"));
const models_1 = tslib_1.__importDefault(require("models"));
const users_1 = require("./routes/users");
const categories_1 = require("./routes/categories");
const collections_1 = require("./routes/collections");
const items_1 = require("./routes/items");
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, cors_1.default)());
server.use('/users', users_1.router);
server.use('/categories', categories_1.router);
server.use('/collections', collections_1.router);
server.use('/items', items_1.router);
models_1.default.sequelize.sync({ alter: true }).then(() => {
    server.listen(process.env.PORT || config_1.default.PORT, () => {
        console.warn(`Server is running on port: http://localhost:${process.env.PORT || config_1.default.PORT}`);
    });
});
//# sourceMappingURL=index.js.map