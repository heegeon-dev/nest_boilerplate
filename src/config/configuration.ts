export default () => ({
  name: process.env.NAME,
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 4000,
  secretKey: process.env.SECRET_KEY,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    type: process.env.DB_TYPE,
    database: process.env.DB_DATABASE,
  },
  aws: {
    S3bucket: process.env.AWS_S3BUCKET,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
  email: {
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    user:process.env.EMAIL_USER,
    password:process.env.EAMIL_PASSWORD
  },
  cache: {
    host:process.env.CACHE_HOST,
    port:process.env.CACHE_PORT,
    ttl:process.env.CACHE_TTL
  }
});
