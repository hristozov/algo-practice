import { QuickSort } from "./bubble";
import { numericSort } from "./numericSort.spec";

describe("BubbleSort", () => {
  numericSort(QuickSort);
});
