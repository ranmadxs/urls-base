import { Example, Post, Get, Route, SuccessResponse, Tags, Response, Body, Path, Put } from '@tsoa/runtime';
import { CreateUrlshortenerSchema } from './UrlshortenerSchema';
import administratorUrlshortenerUseCase from '../domain/usecase/AdministratorUrlshortenerUseCase';
import { Logger } from "tslog";
import Urlshortener from '../entity/Urlshortener.entity';
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
    return response;
   }

  /**
   * Lista urlshortener de un owner, por defecto tiene un tope de 50 por página
   *
   * @summary Lista urlshortener de un owner
   */
   @Get('/list/{owner}')
   @Example<string>('grineldosanchez@yahoo.es')
   @SuccessResponse('200', 'List Urlshortener')
   @Response<unknown>('422', 'Unprocessable Entity - error param')
   public async list(@Path() owner: string): Promise<Urlshortener[]> {    
    logger.debug(owner);
    const list = await administratorUrlshortenerUseCase.list(owner);
    return list;
  }

  /**
   * Establece el estado de una shorturl, las posibilidades son true (activo), false (inactivo)
   *
   * @summary Establece el estado de una shorturl
   */
   @Put('/{shorturl}/{status}')
   @Example<{shorturl: string,  newStatus: boolean}>({
    shorturl: '62b81be4081594ac4ae13ffb',
    newStatus: true,
   })
   @Response<unknown>('422', 'Unprocessable Entity - Body error', {
     error: [
       {
         message: '"status" is required',
         path: ['status'],
         type: 'any.required',
         context: {
           label: 'status',
           key: 'status',
         },
       },
     ],
   })
   @SuccessResponse('204', 'Set status OK')
   public async setStatus(@Path() shorturl: string, @Path() status: boolean): Promise<boolean> {
      logger.debug(shorturl);
      logger.debug(status);
      administratorUrlshortenerUseCase.setStatus(shorturl, status);
      return status;
   }

}
let instance = new UrlshortenerController();
export default instance;
