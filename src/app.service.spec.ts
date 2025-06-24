import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  it('getHello() debería retornar "Hello World!!"', () => {
    expect(service.getHello()).toBe('Hello World!!');
  });

  it('getHelloAleman() debería retornar "Hallo Welt"', () => {
    expect(service.getHelloAleman()).toBe('Hallo Welt');
  });

  it('getHelloFrances() debería retornar "mi mensaje de pruebas"', () => {
    expect(service.getHelloFrances()).toBe('mi mensaje de pruebas');
  });

  it('getHelloEspanol() debería retornar "Hola Mundo!!"', () => {
    expect(service.getHelloEspanol()).toBe('Hola Mundo!!');
  });
});
