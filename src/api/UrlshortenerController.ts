import { Example, Post, Put, Route, SuccessResponse, Tags, Response, Body } from '@tsoa/runtime';
import { CreateUrlshortenerSchema } from './UrlshortenerSchema';
import administratorUrlshortenerUseCase from '../domain/usecase/AdministratorUrlshortenerUseCase';
import { Logger } from "tslog";
const logger: Logger = new Logger();

@Tags('UrlshortenerBase')
@Route('urlshortener')
class UrlshortenerController {
  /**
   * Crea urlshortener a partir de la url original ingresada por el usuario, por defecto queda inmediatamente activa.
   *
   * @summary Crea urlshortener a partir de la url original ingresada por el usuario
   */
   @Post('/')
   @Example<{ url: string, owner: string }>({
    url: 'https://www.google.com/search?q=lorem+ipsum',
    owner: 'grineldosanchez@yahoo.es',
  })   
   @SuccessResponse('200', 'Urlshortener created successful')
   @Response<unknown>('422', 'Unprocessable Entity - Body error')
   public async create(@Body() urlSchema: CreateUrlshortenerSchema): Promise<unknown> {    
    logger.debug(urlSchema);
    const urlsDTO = await administratorUrlshortenerUseCase.saveUrlshortener(urlSchema);
    let response = {urls: urlsDTO.urlshort, msg: 'Urlshortener created successful'};
    //logger.info(urlSchema);
    return response;
   }

}
let instance = new UrlshortenerController();
export default instance;
