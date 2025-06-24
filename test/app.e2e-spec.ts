import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!!');
  });

   it('/operaciones (GET) suma', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'suma', a: 10, b: 30 })
      .expect(200)
      .expect('Content-type', /json/)
      .then((res) => {
        expect(res.body.resultado).toBe(40);
      });
  });

  it('/operaciones (GET) resta', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'resta', a: 50, b: 20 })
      .expect(200)
      .then((res) => {
        expect(res.body.resultado).toBe(30);
      });
  });

  it('/operaciones (GET) multiplicacion', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'multiplicacion', a: 6, b: 7 })
      .expect(200)
      .then((res) => {
        expect(res.body.resultado).toBe(42);
      });
  });

  it('/operaciones (GET) division', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'division', a: 100, b: 10 })
      .expect(200)
      .then((res) => {
        expect(res.body.resultado).toBe(10);
      });
  });

  it('/operaciones (GET) potencia', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'potencia', a: 2, b: 4 })
      .expect(200)
      .then((res) => {
        expect(res.body.resultado).toBe(16);
      });
  });

  it('/operaciones (GET) factorial', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'factorial', a: 5 })
      .expect(200)
      .then((res) => {
        expect(res.body.resultado).toBe(120);
      });
  });

  // --- Casos de borde y errores ---

  it('/operaciones (GET) división por 0', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'division', a: 10, b: 0 })
      .expect(400)
      .then((res) => {
        expect(res.body.error).toContain('No se puede dividir por cero');
      });
  });

  it('/operaciones (GET) factorial con decimal', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'factorial', a: 4.5 })
      .expect(400)
      .then((res) => {
        expect(res.body.error).toContain('enteros no negativos');
      });
  });

  it('/operaciones (GET) factorial negativo', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'factorial', a: -2 })
      .expect(400)
      .then((res) => {
        expect(res.body.error).toContain('enteros no negativos');
      });
  });

  it('/operaciones (GET) con string no numérico', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'suma', a: 'hola', b: 10 })
      .expect(400)
      .then((res) => {
        expect(res.body.resultado).toBeNaN();
      });
  });

  it('/operaciones (GET) sin parámetros', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .expect(400);
  });

  it('/operaciones (GET) operación no soportada', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'raiz', a: 9 })
      .expect(400)
      .then((res) => {
        expect(res.body.error).toContain('Operación no soportada');
      });
  });
});
