import config from '../../../environment.json';

export enum EnvironmentConfig {
    dev = 'local',
    prod = 'production'
}

export interface AppConfig {
    app: {
        name: string,
        env: EnvironmentConfig,
        key: string,
        debug: boolean,
        appUrl: string,
    }
}

export default <AppConfig> config;
