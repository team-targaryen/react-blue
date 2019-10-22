import clone from 'clone';
export function DoublyLinkedList(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
}
export const updateTree = (state, currentComponent) => {
  console.time('updateTreeInsideOfFunction')
  let defaultNameCount;
  // check if current component has a name
  console.time('cloning state data')
  const data = clone(state.data);
  console.timeEnd('cloning state data')
  if (!currentComponent.name) {
    defaultNameCount = state.defaultNameCount + 1;
    currentComponent.name = `Component${defaultNameCount}`;
  }
  // check if any child has empty name, then change it to 'DEFAUL NAME'
  let children = currentComponent.children
  if (children) {
    for (let child of children) {
      if (child.name === '') {
        defaultNameCount = defaultNameCount
          ? defaultNameCount + 1
          : state.defaultNameCount + 1
      }
    }
  } else {
    children = currentComponent
    children.name = currentComponent.name;
  }
  console.time('recursiveFunction');
  (function findComponentAndUpdate(tree, currentComponent) {
    if (tree.componentId === currentComponent.componentId) {
      tree.name = currentComponent.name;
      tree.isContainer = currentComponent.isContainer;
      tree.children = currentComponent.children
      return;
    }
    if (tree.children) {
      tree.children.forEach(child => {
        return findComponentAndUpdate(child, currentComponent);
      });
    }
  }(data, currentComponent));
  console.timeEnd('recursiveFunction')
  console.time('cloneHistory');
  const preHistory = state.history;
  console.timeEnd('cloneHistory')
  console.time('instantiate doubly linked list');
  const history = new DoublyLinkedList(
    {
      data,
      currentComponent,
      nameAndCodeLinkedToComponentId: state.nameAndCodeLinkedToComponentId,
      lastId: state.lastId,
      defaultNameCount: state.defaultNameCount
    }
  );
  console.timeEnd('instantiate doubly linked list')
  preHistory.next = history;
  history.prev = preHistory;
  console.timeEnd('updateTreeInsideOfFunction')
  return {
    data,
    currentComponent,
    history,
    defaultNameCount: defaultNameCount
      ? defaultNameCount
      : state.defaultNameCount
  };
};
