import { Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import globalErrorhandler from './middlewares/globalErrorhandler';
import notFound from './middlewares/notFound';
// import router from './routes';
import cookieParser from 'cookie-parser';
import router from './routes';

const app = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorhandler);

// Not Found
app.use(notFound);

export default app;
