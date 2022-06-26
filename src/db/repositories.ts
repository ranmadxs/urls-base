import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { createConnection, EntityManager, getConnection } from 'typeorm';
import { Logger } from "tslog";
const logger: Logger = new Logger();

class DBRepositoriesFactory {
  private dbRepositories?: MongoConnectionOptions;
  private urlDB?: string;
  private urlCache?: string;
  private entityManager?: EntityManager;

  public setUrlDB(connectionURI: string) {
    this.urlDB = connectionURI;
  }

  public setUrlCache(connectionURI: string) {
    this.urlCache = connectionURI;
  }

  public async connect() {
    this.dbRepositories = {
      name: 'dbRepository',
      type: 'mongodb',
      database: 'ml-db',      
      url: this.urlDB,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await createConnection(this.dbRepositories);
    this.entityManager = getConnection('dbRepository').manager;    
  }


}

export const dbRepositoriesFactory = new DBRepositoriesFactory();
