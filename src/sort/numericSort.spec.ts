import { expect } from 'chai';

import { ISort } from './sort';

/* tslint:disable:no-unused-expression */

/**
 * Produces chai test cases for numeric sorting algorithms which implement ISort.
 *
 * @param klass The target class to generate test cases for.
 */
export function numericSort(
  klass: new () => ISort<number>,
  includeComparators = true,
) {
  function ascComparator(t1: number, t2: number) {
    if (t1 > t2) {
      return 1;
    } else if (t1 < t2) {
      return -1;
    } else {
      return 0;
    }
  }

  function descComparator(t1: number, t2: number) {
    if (t1 > t2) {
      return -1;
    } else if (t1 < t2) {
      return 1;
    } else {
      return 0;
    }
  }

  let sorter: ISort<number>;

  beforeEach(() => {
    sorter = new klass();
  });

  it('sorts empty arrays', () => {
    expect(sorter.sort([], ascComparator)).to.be.empty;
  });

  it('sorts arrays with one element', () => {
    expect(sorter.sort([1], ascComparator)).to.deep.equal([1]);
  });

  it('sorts basic numeric arrays', () => {
    expect(sorter.sort([1, 7, -5, 4, 0, 9, 2], ascComparator)).to.deep.equal([
      -5,
      0,
      1,
      2,
      4,
      7,
      9,
    ]);
  });

  if (includeComparators) {
    it('sorts basic numeric arrays in descending order', () => {
      expect(
        sorter.sort([1, 7, -5, 4, 0, 9, 2], descComparator),
      ).to.deep.equal([9, 7, 4, 2, 1, 0, -5]);
    });
  }

  it('sorts a list of 100 numbers', () => {
    expect(
      sorter.sort(
        [
          47,
          16,
          16,
          92,
          71,
          51,
          14,
          65,
          76,
          68,
          88,
          28,
          70,
          18,
          15,
          26,
          88,
          70,
          32,
          71,
          42,
          38,
          0,
          15,
          87,
          3,
          21,
          88,
          15,
          46,
          43,
          40,
          45,
          75,
          33,
          67,
          65,
          40,
          16,
          95,
          64,
          19,
          39,
          94,
          45,
          46,
          14,
          6,
          47,
          53,
          90,
          69,
          95,
          45,
          28,
          29,
          2,
          14,
          28,
          73,
          68,
          45,
          71,
          87,
          71,
          69,
          39,
          73,
          67,
          9,
          0,
          59,
          48,
          88,
          54,
          15,
          75,
          67,
          58,
          67,
          76,
          80,
          93,
          10,
          95,
          98,
          85,
          22,
          54,
          84,
          38,
          9,
          17,
          57,
          68,
          53,
          45,
          97,
          29,
          24,
        ],
        ascComparator,
      ),
    ).to.deep.equal([
      0,
      0,
      2,
      3,
      6,
      9,
      9,
      10,
      14,
      14,
      14,
      15,
      15,
      15,
      15,
      16,
      16,
      16,
      17,
      18,
      19,
      21,
      22,
      24,
      26,
      28,
      28,
      28,
      29,
      29,
      32,
      33,
      38,
      38,
      39,
      39,
      40,
      40,
      42,
      43,
      45,
      45,
      45,
      45,
      45,
      46,
      46,
      47,
      47,
      48,
      51,
      53,
      53,
      54,
      54,
      57,
      58,
      59,
      64,
      65,
      65,
      67,
      67,
      67,
      67,
      68,
      68,
      68,
      69,
      69,
      70,
      70,
      71,
      71,
      71,
      71,
      73,
      73,
      75,
      75,
      76,
      76,
      80,
      84,
      85,
      87,
      87,
      88,
      88,
      88,
      88,
      90,
      92,
      93,
      94,
      95,
      95,
      95,
      97,
      98,
    ]);
  });
}
