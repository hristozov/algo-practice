import { toArray } from '../../util';

import { IBinaryTreeNode } from './binaryTreeNode';
import { ITree } from './tree';

export interface ITraversibleBinaryTree<T> extends ITree<T> {
  preOrder(): T[];

  inOrder(): T[];

  postOrder(): T[];
}

type Visit<T> = (current: IBinaryTreeNode<T> | null) => IterableIterator<T>;
type TraversalGenerator<T> = (current: IBinaryTreeNode<T>,
                              visitor: Visit<T>) => IterableIterator<T>;

export abstract class BaseBinaryTree<T> {
  protected root: IBinaryTreeNode<T> | null = null;

  public preOrder(): T[] {
    return this.doTraversal(function*(current, visitor) {
      yield current.value;
      yield* visitor(current.left);
      yield* visitor(current.right);
    });
  }

  public inOrder() {
    return this.doTraversal(function*(current, visitor) {
      yield* visitor(current.left);
      yield current.value;
      yield* visitor(current.right);
    });
  }

  public postOrder() {
    return this.doTraversal(function*(current, visitor) {
      yield* visitor(current.left);
      yield* visitor(current.right);
      yield current.value;
    });
  }

  private doTraversal(generator: TraversalGenerator<T>) {
    const visitor: Visit<T> = function*(current) {
      if (!current) {
        // tslint:disable-next-line:return-undefined
        return;
      }

      yield* generator(current, visitor);
    };

    return toArray(visitor(this.root));
  }
}
