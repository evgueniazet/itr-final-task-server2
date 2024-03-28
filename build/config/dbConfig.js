"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const config_1 = tslib_1.__importDefault(require("config/config"));
const mySqlConfigRaw = process.env.NODE_ENV === 'production'
    ? fs_1.default.readFileSync(config_1.default.MYSQL_PROD_CONFIG_PATH)
    : fs_1.default.readFileSync(config_1.default.MYSQL_DEV_CONFIG_PATH);
const dbConfig = JSON.parse(mySqlConfigRaw.toString());
exports.default = dbConfig;
//# sourceMappingURL=dbConfig.js.map