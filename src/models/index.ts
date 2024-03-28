import fs from 'fs';
import * as path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from 'config/dbConfig';
import { TDbConfig } from 'types/index';

const basename = path.basename(__filename);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const env = 'development';
console.log('env', env);
const dataBaseConfig = dbConfig[env as keyof TDbConfig];
console.log('dataBaseConfig', dataBaseConfig);

const db: any = {};

const sequelize = new Sequelize(
    dataBaseConfig.database,
    dataBaseConfig.username,
    dataBaseConfig.password,
    dataBaseConfig,
);

fs.readdirSync(__dirname)
    .filter((file: string) => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })
    .forEach(async (file) => {
        const model = await import(path.join(__dirname, file));
        const modelDefault = model.default(sequelize, DataTypes);
        db[modelDefault.name] = modelDefault;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
