import Router from 'express';
import { scrapeMeBabyyy, getNames } from './controllers/user/user';

export const apiRoutes = Router();

apiRoutes.get('/scrape', scrapeMeBabyyy);
apiRoutes.get('/names', getNames);
