import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import { createConnection } from 'typeorm';
import urlshortenerRoutes from './api/UrlshortenerRoutes'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerDocument = require(`${process.cwd()}/swagger.json`);
import 'dotenv/config'
import { Database } from './db/connection';
import { dbRepositoriesFactory } from './db/repositories';

import { Logger } from "tslog";
const logger: Logger = new Logger();

export default class Server {
  constructor(private app = express()) {}

  async init(): Promise<void> {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, 'public')));

    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err) res.status(500).json({ message: err.message, reqBody: req.body, reqQuery: req.query });
      next();
    });
    createConnection(Database)
      .then(async () => {
        const urlDb = process.env.URL_DB ? process.env.URL_DB : '';
        const urlDbCache = process.env.URL_DB_CACHE ? process.env.URL_DB_CACHE : '';
        if (urlDb === '') {
          logger.error('No se ha definido la url de la base de datos (URL_DB)');
          return;
        }
        dbRepositoriesFactory.setUrlDB(urlDb);
        dbRepositoriesFactory.setUrlCache(urlDbCache);
        await dbRepositoriesFactory.connect();
        logger.debug('Connected to DB');

        this.setRoutes();
        this.start();
      })
      .catch((error) => logger.fatal(error));
  }

  start(): void {
    const port = process.env.PORT || '8080';
    this.app.set('port', port);
    this.app.listen(port, async () => {
      logger.info('Server corriendo en el puerto ' + port);
    });
  }

  setRoutes(): void {
    this.app.get('/', (_req: Request, res: Response) => res.redirect('/docs'));
    this.app.use('/urlshortener', urlshortenerRoutes);
    this.app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
      return res.send(swaggerUi.generateHTML(swaggerDocument));
    });
  }
}
