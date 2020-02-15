import routes from './routes';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})
