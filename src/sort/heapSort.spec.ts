import { HeapSort } from "./heapSort";
import { numericSort } from "./numericSort.spec";

describe("HeapSort", () => {
  numericSort(HeapSort);
});
