import { identity } from './identity';

export function cloneArray<T>(input: T[]): T[] {
    return input.map(identity);
}
