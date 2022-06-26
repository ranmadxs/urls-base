import { EntityRepository, getMongoManager } from 'typeorm';
import { MongoEntityManager } from 'typeorm/entity-manager/MongoEntityManager';
import Urlshortener from '../../entity/Urlshortener.entity'
import { Logger } from "tslog";
const logger: Logger = new Logger();

@EntityRepository()
class UrlshortenerRepository {

  public updateNotificationEvent = async (urlshortener: Urlshortener): Promise<Urlshortener> => {
    const { _id, ...rest } = urlshortener;
    //let em = getMongoManager();

    const save = await getMongoManager().save(Urlshortener, urlshortener);
    
    if (!save._id) {
      throw new Error('No se puede crear urlshortener');
    }

    //logger.info(em);
    return save;
  };
}

let instance = new UrlshortenerRepository();
export default instance;
