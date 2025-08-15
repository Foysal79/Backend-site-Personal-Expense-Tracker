import express, {  Application, NextFunction, Request, Response   } from 'express';
import cors from 'cors';

const app: Application = express();
// parser
app.use(express.json());
app.use(cors());

// application router 
//app.use('/expenses', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});



export default app;
