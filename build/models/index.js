"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path = tslib_1.__importStar(require("path"));
const sequelize_1 = require("sequelize");
const dbConfig_1 = tslib_1.__importDefault(require("config/dbConfig"));
const basename = path.basename(__filename);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const env = 'development';
console.log('env', env);
const dataBaseConfig = dbConfig_1.default[env];
console.log('dataBaseConfig', dataBaseConfig);
const db = {};
const sequelize = new sequelize_1.Sequelize(dataBaseConfig.database, dataBaseConfig.username, dataBaseConfig.password, dataBaseConfig);
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
})
    .forEach((file) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const model = yield Promise.resolve(`${path.join(__dirname, file)}`).then(s => tslib_1.__importStar(require(s)));
    const modelDefault = model.default(sequelize, sequelize_1.DataTypes);
    db[modelDefault.name] = modelDefault;
}));
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
//# sourceMappingURL=index.js.map