import dotenv from 'dotenv';
dotenv.config()

const config = {
    nodeEnv: process.env['NODE_ENV'] ?? 'development',
    port: process.env['PORT'] ?? 3000,
    
    clientOrigins: {
        'development': process.env['DEV_ORIGIN'] ?? '*',
        'production': process.env['PROD_ORIGIN'] ?? '*'
    }
}

export default config
