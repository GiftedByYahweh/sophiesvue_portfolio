const SESSION_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30;

export const loadAppConfig = () => ({
  port: Number(process.env.PORT),
  host: process.env.HOST,
  logger: {
    level: process.env.LOG_LEVEL ?? 'info',
    pretty: process.env.NODE_ENV !== 'production',
  },
  session: {
    secret: process.env.SESSION_SECRET,
    maxAge: SESSION_COOKIE_MAX_AGE,
  },
  db: {
    url: process.env.DB_CONNECTION_URL,
  },
  cors: {
    origin:
      process.env.NODE_ENV === 'production' ? process.env.API_ORIGIN : true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
  cloudinary: {
    name: process.env.CLOUDINARY_CLOUD_NAME,
    key: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_API_SECRET,
  },
  multipart: {
    limits: {
      fileSize: 100 * 1024 * 1024,
      fieldNameSize: 100,
      fieldSize: 1024 * 1024,
      fields: 10,
      files: 20,
      headerPairs: 2000,
      parts: 1000,
    },
  },
});

export type AppConfig = ReturnType<typeof loadAppConfig>;
