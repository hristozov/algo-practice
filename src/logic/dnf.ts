import { range } from '../util/index';
import { toArray } from '../util/toArray';

type BooleanExpression = (...args: boolean[]) => boolean;

export class DisjunctiveNormalForm {
  private symbols: string[];

  public constructor(private expression: BooleanExpression) {
    this.symbols = this.constructSymbols();
  }

  public toExpression(): string {
    const dnf = this.constructMap();
    const optimizedMap = this.optimizeMap(dnf);
    const conjunctions = optimizedMap.map((row) => this.toConjunction(row));

    return this.constructDisjunction(conjunctions);
  }

  private constructSymbols(): string[] {
    return toArray(range(0, this.expression.length)).map((i) => `a${i}`);
  }

  private call(args: boolean[]): boolean {
    return this.expression.apply(null, args);
  }

  private toConjunction(row: boolean[]): string {
    const symbols = toArray(range(0, row.length))
      .map((i: number) => {
        const symbol = this.symbols[i];

        return row[i] ? symbol : `!${symbol}`;
      });
    if (symbols.length > 1) {
      return `(${symbols.join('&&')})`;
    } else {
      return symbols.join('');
    }
  }

  private pad(binary: string, length: number) {
    const diff = length - binary.length;

    return diff > 0 ? '0'.repeat(diff) + binary : binary;
  }

  private optimizeMap(map: boolean[][]): boolean[][] {
    return map.filter((row) => this.call(row));
  }

  private constructDisjunction(expressions: string[]) {
    return expressions.join('||');
  }

  private constructMap(): boolean[][] {
    const numOfSymbols = this.symbols.length;
    const tableSize = Math.pow(2, numOfSymbols);
    const indexes = toArray(range(0, tableSize));

    return indexes.map((index: number) =>
      this.pad(index.toString(2), numOfSymbols)
        .split('')
        .map((bit: string) => bit === '1'));
  }
}
