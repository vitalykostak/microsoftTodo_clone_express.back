import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

import config from './config.js';

import authRouter from './routes/auth-route.js';
import userRouter from './routes/user-route.js';
import taskRouter from './routes/task-route.js';

import errorMiddleware from './middlewares/error-middleware.js';

const PORT = config.PORT;
const MONGO_URI = config.MONGO_URI;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST Api',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const openapiSpecification = swaggerJSDoc(swaggerOptions);

const app = express();

app.use(cors(config.CORS_OPTIONS));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification));

app.use(errorMiddleware);

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server was started on ${PORT}...`);
    });
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log(e);
  }
}

start();
