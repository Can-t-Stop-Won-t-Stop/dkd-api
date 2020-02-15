import * as express from 'express';
import kitty from './kitty';

const app = express();

kitty(app);

export default app;
