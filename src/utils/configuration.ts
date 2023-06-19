import { config } from 'dotenv';
import { validateEnvironmentVariable } from './helpers';

config();

export const SERVER = {
    HOST: validateEnvironmentVariable(process.env.REST_HOST),
    PORT: Number(validateEnvironmentVariable(process.env.REST_PORT)),
    ORIGIN: () => {
        if (validateEnvironmentVariable(process.env.REST_ORIGIN) === 'true') {
            return true;
        }

        return process.env.REST_ORIGIN;
    }
}

export const SOURCE = validateEnvironmentVariable(process.env.URL_FOR_PEP_DATA);