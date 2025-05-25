import { app, startServer } from './shared/config';
import { API_BASE_PATH } from './shared/constants';

import { authRouter } from './api/routes/auth';
import { userRouter } from './api/routes/user';
import { sessionRouter } from './api/routes/session';
import { notFoundMiddleware } from './api/middlewares/not-found-middleware';
import { errorMiddleware } from './api/middlewares/error-middleware';

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Auth API is running 🚀',
    version: '1.0.0',
    endpoints: [`${API_BASE_PATH}/auth`, `${API_BASE_PATH}/sessions`, `${API_BASE_PATH}/users`],
  });
});

// Register routers
app.use(`${API_BASE_PATH}/auth`, authRouter);
app.use(`${API_BASE_PATH}/users`, userRouter);
app.use(`${API_BASE_PATH}/sessions`, sessionRouter);

// Handle 404s and errors
app.use(notFoundMiddleware);
app.use(errorMiddleware);

startServer();
