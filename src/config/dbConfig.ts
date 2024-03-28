import fs from 'fs';
import appConfig from 'config/config';

const mySqlConfigRaw = process.env.NODE_ENV === 'production'
    ? fs.readFileSync(appConfig.MYSQL_PROD_CONFIG_PATH)
    : fs.readFileSync(appConfig.MYSQL_DEV_CONFIG_PATH)
const dbConfig = JSON.parse(mySqlConfigRaw.toString());

export default dbConfig;
