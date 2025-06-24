import { Injectable } from '@nestjs/common';

@Injectable()
export class OperacionesService {
  operar(operacion: string = '', a: number, b?: number) {
    switch (operacion) {
      case 'suma':
        return this.#suma(a, b!);
      case 'resta':
        return this.#resta(a, b!);
      case 'multiplicacion':
        return this.#multiplicacion(a, b!);
      case 'division':
        return this.#division(a, b!);
      case 'potencia':
        return this.#potencia(a, b!);
      case 'factorial':
        return this.#factorial(a);
      default:
        throw new Error(`Operación no soportada: ${operacion}`);
    }
  }

  #suma(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con numeros indefinidos.');
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return a + b;
  }

  #resta(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con numeros indefinidos.');
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return a - b;
  }

  #multiplicacion(a: number, b: number): number {
    this.#validarNumeros(a, b);
    return a * b;
  }

  #division(a: number, b: number): number {
    this.#validarNumeros(a, b);
    if (b === 0) throw new Error('No se puede dividir por cero.');
    return a / b;
  }

  #potencia(a: number, b: number): number {
    this.#validarNumeros(a, b);
    return Math.pow(a, b);
  }

  #factorial(a: number): number {
    if (a === undefined || typeof a !== 'number' || a < 0 || !Number.isInteger(a)) {
      throw new Error('El factorial solo se puede aplicar a enteros no negativos.');
    }
    if (a === 0 || a === 1) return 1;
    let resultado = 1;
    for (let i = 2; i <= a; i++) {
      resultado *= i;
    }
    return resultado;
  }

  #validarNumeros(...nums: number[]) {
    for (const num of nums) {
      if (num === undefined || typeof num !== 'number') {
        throw new Error('Los parámetros deben ser números definidos.');
      }
    }
  }


}
