import { expect } from "chai";

import { BinaryTreeNode } from "./binaryTreeNode";

describe("BinaryTreeNode", () => {
  describe("#isLead", () => {
    it("is true for a node with no children", () => {
      const node = new BinaryTreeNode(1);

      expect(node.isLeaf()).to.eq(true);
    });

    it("is false for a node with a left", () => {
      const otherNode = new BinaryTreeNode(1);
      const node = new BinaryTreeNode(2);

      node.left = otherNode;

      expect(node.isLeaf()).to.eq(false);
    });

    it("is false for a node with a right", () => {
      const otherNode = new BinaryTreeNode(1);
      const node = new BinaryTreeNode(2);

      node.right = otherNode;

      expect(node.isLeaf()).to.eq(false);
    });

    it("is true for a node with both left and right", () => {
      const left = new BinaryTreeNode(1);
      const right = new BinaryTreeNode(2);
      const node = new BinaryTreeNode(3);

      node.left = left;
      node.right = right;

      expect(node.isLeaf()).to.eq(false);
    });
  });
});
