import * as path from 'path';
import { config } from 'dotenv';

const root = path.resolve(__dirname, '../../');

config();

const appConfig = {
    PROTOCOL: 'http',
    PORT: process.env.PORT || 3001,
    MYSQL_DEV_CONFIG_PATH: path.join(root, 'src/config/mySqlDevConfig.json'),
    MYSQL_PROD_CONFIG_PATH: path.join(root, 'src/config/mySqlProdConfig.json'),
    TOKEN_LIFETIME: Number(process.env.TOKEN_LIFETIME) || 5,
    JWT_CERT_PATH: path.join(root, 'certs/jwt.cert'),
};

export default appConfig;
