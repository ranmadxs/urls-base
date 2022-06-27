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
        urlshortener = await urlshortenerRepository.save(urlshortener);
        const urlshortenerDTO = new UrlshortenerDTO(urlshortener.url, urlshortener.owner, this.createUrlShort(String(urlshortener.id)), urlshortener.isActive);
        logger.debug(urlshortenerDTO);
        return urlshortenerDTO;
    }

    public async list(owner: string): Promise<Urlshortener[]> {
        const listUrls = await urlshortenerRepository.listByOwner(owner);
        return listUrls;
    }

    public async setStatus(shorturl: string,  newStatus: boolean): Promise<Boolean> {
        await urlshortenerRepository.updateStatus(shorturl, newStatus);
        return newStatus;
    }

    private createUrlShort(uri: string): string {
        const resp = String(process.env.BASE_URL) + '/' + uri;
        return resp;
    }

}

let instance = new AdministratorUrlshortenerUseCase();
export default instance;
