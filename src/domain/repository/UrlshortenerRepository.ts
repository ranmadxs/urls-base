import { EntityRepository, getMongoManager, getRepository, EntityManager, getManager } from 'typeorm';
const ObjectID = require('mongodb').ObjectID;
import Urlshortener from '../../entity/Urlshortener.entity'
import { Logger } from "tslog";
const logger: Logger = new Logger();

@EntityRepository()
class UrlshortenerRepository {

  private em: any;

  public setEntityManager (entityManager: EntityManager = getManager()) {
    this.em = entityManager;
  }

  public getEntityManager (): EntityManager {
    if (!this.em) { 
      this.em = getManager();
    }
    return this.em;
  }

  public save = async (urlshortener: Urlshortener): Promise<Urlshortener> => {
    const { id, ...rest } = urlshortener;
    const save = await this.getEntityManager().save(Urlshortener, urlshortener);
    
    if (!save.id) {
      throw new Error('No se puede crear urlshortener');
    }
    return save;
  };

  public updateStatus = async (id: string,  newStatus: Boolean) => {
    let urlshor = await this.getEntityManager().findOne(Urlshortener, {
      where: {
        '_id': new ObjectID(id) ,
      }
    });
    if (urlshor){
      urlshor.isActive = newStatus;
      await this.getEntityManager().save(Urlshortener, urlshor);    
      logger.debug(urlshor);
    }        
  };
  
  public listByOwner = async (owner: string, quantityLot: number = 50): Promise<Urlshortener[]> => {

    const urls = await this.getEntityManager().find(Urlshortener, {
      where: {
        'owner': { $eq: owner },
      },
      take: quantityLot,
    });
    return urls;
  };

}

let instance = new UrlshortenerRepository();
export default instance;
