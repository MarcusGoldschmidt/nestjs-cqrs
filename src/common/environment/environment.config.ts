require('dotenv').config();

export default {
    // TODO: Refatorar para buildar tanto para o react quando para o nest
    app: {
        name: process.env.APP_NAME,
        env: process.env.APP_ENV,
        key: process.env.APP_KEY,
        debug: process.env.APP_DEBUG,
        appUrl: process.env.APP_URL,
    },
};
