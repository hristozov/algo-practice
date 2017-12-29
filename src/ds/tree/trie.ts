import { merge } from '../../util/merge';
import { toArray } from '../../util/toArray';
import { IKVTree } from './tree';

interface IListResult<T> {
  [key: string]: T;
}

export class Trie<T> implements IKVTree<string, T> {
  private children: { [key: string]: Trie<T> } = {};

  public constructor(private value: T | null = null) {
  }

  public add(key: string, value: T | null): Trie<T> {
    function helper(current: Trie<T>,
                    currentKey: string,
                    parentKey: string | null,
                    parent: Trie<T> | null) {
      const children = current.children;
      if (!currentKey || currentKey.length === 0) {
        current.value = value;

        if (!value && Object.keys(children).length === 0 && parent && parentKey) {
          delete parent.children[parentKey];
        }

        return current;
      }

      let child = children[currentKey[0]];
      if (!child) {
        child = children[currentKey[0]] = new Trie<T>(null);
      }
      helper(child, currentKey.slice(1), currentKey, current);
    }

    helper(this, key, null, null);

    return this;
  }

  public get(key: string): T | null {
    if (!key || key.length === 0) {
      return this.value;
    }

    const child = this.children[key[0]];

    return child ? child.get(key.slice(1)) : null;
  }

  public remove(key: string): Trie<T> {
    return this.add(key, null);
  }

  public contains(key: string): boolean {
    return !!this.get(key);
  }

  public list(): IListResult<T> {
    function* helper(prefix: string,
                     currentKey: string | null,
                     current: Trie<T>): IterableIterator<IListResult<T>> {
      if (current.value && currentKey) {
        const res: IListResult<T> = {};
        res[prefix] = current.value;
        yield res;
      }

      const children = current.children;
      for (const k of Object.keys(children)) {
        yield* helper(prefix + k, k, children[k]);
      }
    }

    return toArray(helper('', null, this))
      .reduce(merge, {});
  }
}
