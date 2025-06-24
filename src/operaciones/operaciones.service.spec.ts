import { Test, TestingModule } from '@nestjs/testing';
import { OperacionesService } from './operaciones.service';

describe('OperacionesService', () => {
  let service: OperacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperacionesService],
    }).compile();

    service = module.get<OperacionesService>(OperacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // SUMA
  it('debería sumar correctamente', () => {
    expect(service.operar('suma', 10, 20)).toBe(30);
    expect(service.operar('suma', -10, 20)).toBe(10);
    expect(service.operar('suma', Math.PI, 30)).toBeCloseTo(33.14, 2);
  });

  it('debería manejar errores en suma', () => {
    expect(service.operar('suma', '10' as any, 5)).toBeNaN();
    expect(service.operar('suma', null as any, 5)).toBeNaN();
    expect(() => service.operar('suma', undefined as any, 5)).toThrow(
      'No se puede llamar con numeros indefinidos.'
    );
  });

  // RESTA
  it('debería restar correctamente', () => {
    expect(service.operar('resta', 30, 10)).toBe(20);
    expect(service.operar('resta', -30, -10)).toBe(-20);
  });

  it('debería manejar errores en resta', () => {
    expect(service.operar('resta', 'a' as any, 5)).toBeNaN();
    expect(() => service.operar('resta', undefined as any, 5)).toThrow();
  });

  // MULTIPLICACION
  it('debería multiplicar correctamente', () => {
    expect(service.operar('multiplicacion', 5, 6)).toBe(30);
    expect(service.operar('multiplicacion', -3, 2)).toBe(-6);
  });

  it('debería manejar errores en multiplicación', () => {
    expect(service.operar('multiplicacion', null as any, 5)).toBeNaN();
    expect(() => service.operar('multiplicacion', undefined as any, 2)).toThrow();
  });

  // DIVISIÓN
  it('debería dividir correctamente', () => {
    expect(service.operar('division', 10, 2)).toBe(5);
    expect(service.operar('division', -20, 4)).toBe(-5);
  });

  it('debería manejar errores en división', () => {
    expect(() => service.operar('division', 10, 0)).toThrow('No se puede dividir por cero.');
    expect(() => service.operar('division', undefined as any, 2)).toThrow();
    expect(service.operar('division', null as any, 2)).toBeNaN();
  });

  // POTENCIA
  it('debería calcular potencia correctamente', () => {
    expect(service.operar('potencia', 2, 3)).toBe(8);
    expect(service.operar('potencia', 10, 0)).toBe(1);
  });

  it('debería manejar errores en potencia', () => {
    expect(() => service.operar('potencia', undefined as any, 2)).toThrow();
    expect(service.operar('potencia', 'a' as any, 2)).toBeNaN();
  });

  // FACTORIAL
  it('debería calcular factorial correctamente', () => {
    expect(service.operar('factorial', 0)).toBe(1);
    expect(service.operar('factorial', 1)).toBe(1);
    expect(service.operar('factorial', 5)).toBe(120);
  });

  it('debería manejar errores en factorial', () => {
    expect(() => service.operar('factorial', -3)).toThrow(
      'El factorial solo se puede aplicar a enteros no negativos.'
    );

    expect(() => service.operar('factorial', 5.5)).toThrow(
      'El factorial solo se puede aplicar a enteros no negativos.'
    );

    expect(() => service.operar('factorial', undefined as any)).toThrow();
    expect(() => service.operar('factorial', null as any)).toThrow();
    expect(() => service.operar('factorial', '5' as any)).toThrow();
  });

  // OPERACIÓN DESCONOCIDA
  it('debería lanzar error si la operación no existe', () => {
    expect(() => service.operar('desconocida', 1, 2)).toThrow('Operación no soportada: desconocida');
  });
 
});
