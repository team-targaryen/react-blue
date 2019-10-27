export const deleteChildrenInNameAndCodeLinkedToComponentId = (node, obj) => {
  if (node instanceof Object) {
    delete obj[node]
    return obj;
  }
  node.forEach((childNode, i) => {
    delete obj[childNode];
    if (childNode.children) {
      delete obj[childNode];
      deleteChildrenInNameAndCodeLinkedToComponentId(childNode.children, obj);
    }
  });
  return obj;
}
export const findAndDeleteInCurrentComponent = (tree, currentComponent, parent) => {
  if (tree.componentId === parent.componentId) {
    for (let i = 0; i < tree.children.length; i++) {
      if(tree.children[i] === null){
        tree.children.splice(i, 1);
      }
      if (tree.children[i].componentId === currentComponent.componentId) {
        tree.children.splice(i, 1);
        parent.children = tree.children.slice();
        return;
      }
    }
  } else if (tree.children) {
    tree.children.forEach(child => {
      return findAndDeleteInCurrentComponent(child, currentComponent, parent);
    });
  }
};