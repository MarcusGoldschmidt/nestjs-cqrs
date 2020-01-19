require('dotenv').config();

export default {
    app: {
        name: process.env.APP_NAME,
        env: process.env.APP_ENV,
        key: process.env.APP_KEY,
        debug: process.env.APP_DEBUG,
        appUrl: process.env.APP_URL,
    },
};
