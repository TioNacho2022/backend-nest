import { Test, TestingModule } from '@nestjs/testing';
import { OperacionesController } from './operaciones.controller';
import { OperacionesService } from './operaciones.service';
import { Response } from 'express';

describe('OperacionesController', () => {
  let controller: OperacionesController;
  let service: OperacionesService;

  // Mock para res de express
  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperacionesController],
      providers: [
        {
          provide: OperacionesService,
          useValue: {
            operar: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OperacionesController>(OperacionesController);
    service = module.get<OperacionesService>(OperacionesService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('debería responder con resultado y status 200 para operación exitosa', () => {
    const res = mockResponse();
    (service.operar as jest.Mock).mockReturnValue(50);

    controller.operar(res, 'suma', 20, 30);

    expect(service.operar).toHaveBeenCalledWith('suma', 20, 30);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      resultado: 50,
      mensaje: 'operacion exitosa',
    });
  });

  it('debería responder con NaN y status 502 si operación no devuelve resultado', () => {
    const res = mockResponse();
    (service.operar as jest.Mock).mockReturnValue(NaN);

    controller.operar(res, 'suma', 10, 20);

    expect(service.operar).toHaveBeenCalledWith('suma', 10, 20);
    expect(res.status).toHaveBeenCalledWith(502);
    expect(res.json).toHaveBeenCalledWith({
      resultado: NaN,
      mensaje: 'operacion no pudo ser calculada',
    });
  });

  it('debería responder con NaN y status 502 si operación devuelve undefined', () => {
    const res = mockResponse();
    (service.operar as jest.Mock).mockReturnValue(undefined);

    controller.operar(res, 'resta', 10, 5);

    expect(service.operar).toHaveBeenCalledWith('resta', 10, 5);
    expect(res.status).toHaveBeenCalledWith(502);
    expect(res.json).toHaveBeenCalledWith({
      resultado: NaN,
      mensaje: 'operacion no pudo ser calculada',
    });
  });
});

