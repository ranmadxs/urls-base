import { mock, MockProxy } from 'jest-mock-extended';
import { EntityManager } from 'typeorm';
import urlshortenerRepository from '../../../src/domain/repository/UrlshortenerRepository' 
import Urlshortener from '../../../src/entity/Urlshortener.entity' 


const urlshortener = new Urlshortener('https://example.cl', new Date, new Date, true, 'example@owner.cl');
const promise: Promise<any> = Promise.resolve(urlshortener);

describe('urlshortenerRepository test', () => {
  test('test de guardado de urlshortener', async () => {    
    const mockEntityManager: MockProxy<EntityManager> = mock<EntityManager>();
    urlshortenerRepository.setEntityManager(mockEntityManager);
    mockEntityManager.find.mockReturnValue(promise);
    const response = await urlshortenerRepository.listByOwner('example@owner.cl');
    expect(response).toEqual(urlshortener);
  });
});
