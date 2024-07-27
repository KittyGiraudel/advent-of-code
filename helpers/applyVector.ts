import type { Coords, QuadriCoords, TriCoords } from '../types';

/**
 * Apply the given vector to the given X,Y(,Z,T) coords.
 */
function applyVector(coords: Coords, vector: Coords): Coords;
function applyVector(coords: TriCoords, vector: TriCoords): TriCoords;
function applyVector(coords: QuadriCoords, vector: QuadriCoords): QuadriCoords;
function applyVector(coords: number[], vector: number[]) {
  const hasThirdPart = typeof coords[2] === 'number' && typeof vector[2] === 'number';
  const hasFourthPart = typeof coords[3] === 'number' && typeof vector[3] === 'number';

  return [
    coords[0] + vector[0],
    coords[1] + vector[1],
    hasThirdPart ? coords[2] + vector[2] : null,
    hasFourthPart ? coords[3] + vector[3] : null,
  ].filter((segment) => segment !== null) as number[];
}

export default applyVector;
