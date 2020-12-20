import { config } from 'dotenv';
config();
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { logger } from './logging';

const app: Application = express();
const port: string = process.env.PORT as string;

app.use(cors());
app.use(helmet());

app.use(bodyParser.json());

app.all('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint doesn\'t exist' });
});

if (process.env.NODE_ENV === 'local') {
    app.use(morgan('combined'));
}

app.listen(port, () => logger.log('info', `server is listening on ${port}`));
