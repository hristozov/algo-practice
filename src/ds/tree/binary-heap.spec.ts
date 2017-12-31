import { expect } from 'chai';
import { BinaryHeap } from './binary-heap';

/* tslint:disable:no-unused-expression */

describe('BinaryHeap', () => {
  function createMinHeap(): BinaryHeap<number> {
    function ascComparator(t1: number, t2: number) {
      if (t1 > t2) {
        return 1;
      } else if (t1 < t2) {
        return -1;
      } else {
        return 0;
      }
    }

    return new BinaryHeap<number>(ascComparator);
  }

  describe('#add', () => {
    it('adds an element to an empty heap', () => {
      expect(createMinHeap()
               .add(1)
               .toList())
        .to.eql([1]);
    });

    it('adds multiple elements to an empty heap', () => {
      expect(createMinHeap()
               .add(3)
               .add(1)
               .add(4)
               .toList())
        .to.eql([1, 3, 4]);
    });

    it('replaces the minimum element in a heap', () => {
      expect(createMinHeap()
               .add(4)
               .add(0)
               .toList())
        .to.eql([0, 4]);
    });

    it('does not touch the minimum element in a heap', () => {
      expect(createMinHeap()
               .add(4)
               .add(5)
               .toList())
        .to.eql([4, 5]);
    });

    it('properly adds children to a single minimal element', () => {
      expect(createMinHeap()
               .add(4)
               .add(5)
               .add(1)
               .toList())
        .to.eql([1, 5, 4]);
    });

    it('constructs heaps with multiple elements', () => {
      expect(createMinHeap()
               .add(3)
               .add(4)
               .add(2)
               .add(7)
               .add(0)
               .add(1)
               .add(5)
               .toList()).to.eql([0, 2, 1, 7, 4, 3, 5]);
    });

    it('constructs heaps with duplicate elements', () => {
      expect(createMinHeap()
               .add(2)
               .add(3)
               .add(3)
               .toList()).to.eql([2, 3, 3]);
    });
  });

  describe('#remove', () => {
    it('does not fail if the element does not exist', () => {
      expect(createMinHeap()
               .add(4)
               .remove(7)
               .toList())
        .to.eql([4]);
    });

    it('removes a single element from the heap', () => {
      expect(createMinHeap()
               .add(4)
               .remove(4)
               .toList())
        .to.eql([]);
    });

    it('removes a newly added bigger element from the heap', () => {
      expect(createMinHeap()
               .add(4)
               .add(5)
               .remove(5)
               .toList())
        .to.eql([4]);
    });

    it('removes a newly added smaller element from the heap', () => {
      expect(createMinHeap()
               .add(4)
               .add(5)
               .remove(4)
               .toList())
        .to.eql([5]);
    });

    it('removes the bigger of two newly added bigger elements', () => {
      expect(createMinHeap()
               .add(4)
               .add(5)
               .add(6)
               .remove(6)
               .toList())
        .to.eql([4, 5]);
    });

    it('removes the smaller of two newly added bigger elements', () => {
      expect(createMinHeap()
               .add(4)
               .add(5)
               .add(6)
               .remove(5)
               .toList())
        .to.eql([4, 6]);
    });

    it('removes the bigger of two newly added smaller elements', () => {
      expect(createMinHeap()
               .add(4)
               .add(1)
               .add(2)
               .remove(2)
               .toList())
        .to.eql([1, 4]);
    });

    it('removes the smaller of two newly added smaller elements', () => {
      expect(createMinHeap()
               .add(4)
               .add(1)
               .add(2)
               .remove(1)
               .toList())
        .to.eql([2, 4]);
    });

    it('removes the smallest element of when two bigger are added', () => {
      expect(createMinHeap()
               .add(0)
               .add(1)
               .add(2)
               .remove(0)
               .toList())
        .to.eql([1, 2]);
    });

    it('removes the smallest element of when two smaller are added', () => {
      expect(createMinHeap()
               .add(4)
               .add(1)
               .add(2)
               .remove(4)
               .toList())
        .to.eql([1, 2]);
    });

    context('with a heap with multiple elements', () => {
      const heap = createMinHeap().add(3).add(4).add(2).add(7).add(0).add(1).add(5);

      it('removes the element which we added first', () => {
        expect(heap
                 .clone()
                 .remove(3)
                 .toList())
          .to.eql([0, 2, 1, 7, 4, 5]);
      });

      it('removes the smallest element', () => {
        expect(heap
                 .clone()
                 .remove(0)
                 .toList())
          .to.eql([1, 2, 3, 7, 4, 5]);
      });

      it('removes the biggest element', () => {
        expect(heap
                 .clone()
                 .remove(7)
                 .toList())
          .to.eql([0, 2, 1, 5, 4, 3]);
      });

      it('removes the second biggest element', () => {
        expect(heap
                 .clone()
                 .remove(5)
                 .toList())
          .to.eql([0, 2, 1, 7, 4, 3]);
      });
    });

    context('with a heap with duplicate elements', () => {
      it('removes only one of the bigger elements', () => {
        expect(createMinHeap()
                 .add(2)
                 .add(3)
                 .add(3)
                 .remove(3)
                 .toList())
          .to.eql([2, 3]);
      });

      it('removes only one of the smaller elements', () => {
        expect(createMinHeap()
                 .add(2)
                 .add(2)
                 .add(3)
                 .remove(2)
                 .toList())
          .to.eql([2, 3]);
      });
    });
  });

  describe('#contains', () => {
    context('with an empty heap', () => {
      it('works correctly', function() {
        expect(createMinHeap().contains(5)).to.eq(false);
      });
    });

    context('with a heap with multiple elements', () => {
      it('includes all the elements', () => {
        const elements = [1, 7, 8, 2, 3, 0, 4, 12];
        const heap = elements.reduce((result, element) => result.add(element),
                                     createMinHeap());
        elements.forEach((element) => {
          expect(heap.contains(element)).to.eq(true);
        });
      });
    });
  });

  describe('#first', () => {
    context('with an empty heap', () => {
      it('works correctly', function() {
        expect(createMinHeap().first()).to.eq(null);
      });
    });

    context('with a heap with multiple elements', () => {
      it('includes all the elements', () => {
        const elements = [1, 7, 8, 2, 3, 0, 4, 12];
        const heap = elements.reduce((result, element) => result.add(element),
                                     createMinHeap());
        expect(heap.first()).to.eq(0);
      });
    });
  });
});
