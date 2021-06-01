import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    DATABASE_URI: process.env.DATABASE_URI,
    DATABSE_PORT: process.env.DATABASE_PORT || 27017,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    SECRET_KEY_TOKEN: process.env.SECRET_KEY_TOKEN,
}));
