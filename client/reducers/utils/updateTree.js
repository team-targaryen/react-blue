import clone from 'clone';
export function DoublyLinkedList(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
}
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
export const updateTree = (state, currentComponent) => {
  let defaultNameCount;
  const data = clone(state.data);
  if (!currentComponent.name) {
    defaultNameCount = state.defaultNameCount + 1;
    currentComponent.name = `Component${defaultNameCount}`;
  }
  // check if any child has empty name, then change it to 'DEFAULT NAME'
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
  function findComponentAndUpdate(tree, currentComponent) {
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
  };
  findComponentAndUpdate(data, currentComponent);
  const preHistory = state.history;
  const history = new DoublyLinkedList(
    {
      data,
      currentComponent,
      nameAndCodeLinkedToComponentId: state.nameAndCodeLinkedToComponentId,
      lastId: state.lastId,
      defaultNameCount: state.defaultNameCount
    }
  );
  preHistory.next = history;
  history.prev = preHistory;
  return {
    data,
    currentComponent,
    history,
    defaultNameCount: defaultNameCount
      ? defaultNameCount
      : state.defaultNameCount
  };
};
