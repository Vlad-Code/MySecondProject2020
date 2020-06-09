const compareKeys = (node1, node2) => {
  if (node1.key > node2.key) {
    return 1;
  }
  if (node1.key < node2.key) {
    return -1;
  }
  return 0;
};

export default compareKeys;
