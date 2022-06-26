import Urlshortener from '../../entity/Urlshortener.entity'
import urlshortenerRepository from '../repository/UrlshortenerRepository'
import { CreateUrlshortenerSchema } from '../../api/UrlshortenerSchema';
import { UrlshortenerDTO } from '../dto/UrlshortenerDTO';
import { Logger } from "tslog";
import { string } from 'joi';
const logger: Logger = new Logger();

class AdministratorUrlshortenerUseCase {

    public async saveUrlshortener(urlshortenerSchema: CreateUrlshortenerSchema): Promise<UrlshortenerDTO> {
        //const urlshortenerRepository = new UrlshortenerRepository();
        let urlshortener = new Urlshortener(urlshortenerSchema.url, new Date, new Date, true, urlshortenerSchema.owner);
        urlshortener = await urlshortenerRepository.updateNotificationEvent(urlshortener);
        const urlshortenerDTO = new UrlshortenerDTO(urlshortener.url, urlshortener.owner, this.createUrlShort(String(urlshortener._id)), urlshortener.status);
        logger.debug(urlshortenerDTO);
        return urlshortenerDTO;
    }

    private createUrlShort(uri: string): string {
        const resp = String(process.env.BASE_URL) + ':' + String(process.env.PORT + '/' + uri);
        return resp;
    }

}

let instance = new AdministratorUrlshortenerUseCase();
export default instance;
