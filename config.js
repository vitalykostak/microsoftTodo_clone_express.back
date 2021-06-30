const config = {
  PORT: 5000,
  MONGO_URI:
    'mongodb+srv://vitaly:JU6p6A04UQUnKcmp@cluster0.ih9l1.mongodb.net/Todo_microsoft?retryWrites=true&w=majority',
  JWT_ACCES_SECRET: 'ACCES',
  JWT_REFRESH_SECRET: 'REFRESH',
  JWT_ACCES_TIME: '30m',
  JWT_REFRESH_TIME: { str: '30d', ms: 30 * 24 * 60 * 60 * 1000 },
  CORS_OPTIONS: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
};

export default config;
