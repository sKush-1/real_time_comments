import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import commentRoutes from './routes/commentRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', commentRoutes);

export default app;
