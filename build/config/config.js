"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const dotenv_1 = require("dotenv");
const root = path.resolve(__dirname, '../../');
(0, dotenv_1.config)();
const appConfig = {
    PROTOCOL: 'http',
    PORT: process.env.PORT || 3001,
    MYSQL_DEV_CONFIG_PATH: path.join(root, 'src/config/mySqlDevConfig.json'),
    MYSQL_PROD_CONFIG_PATH: path.join(root, 'src/config/mySqlProdConfig.json'),
    TOKEN_LIFETIME: Number(process.env.TOKEN_LIFETIME) || 5,
    JWT_CERT_PATH: path.join(root, 'certs/jwt.cert'),
};
exports.default = appConfig;
//# sourceMappingURL=config.js.map