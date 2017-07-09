import { identity } from '.';

export function cloneArray<T>(input: T[]): T[] {
    return input.map(identity);
}
