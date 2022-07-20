require('dotenv').config();

const CONFIG = {}
CONFIG.port = process.env.PORT || 5000;
CONFIG.atlas_uri = process.env.ATLAS_URI || 'mongodb+srv://root:root@cluster0.4evlu.mongodb.net/jarvis?retryWrites=true&w=majority';
CONFIG.fasttosms_api_key = process.env.FASTTOSMS_API_KEY || 'NI4MfJqVnihAvSlbEUH76BDm3XzwOsaCkxPr9Z0WyTctp2eLFj7kjG1wRr0DxeQBI3gVTFS6Cc2dyWsU';
CONFIG.jwt_secret = process.env.JWT_SECRET || 'FFFJWIEJEKKCNCJSSK';
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'FFFJWIEJEKKCNCJSSK';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || 99999999 ;
module.exports = CONFIG;