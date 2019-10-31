import React, { useEffect, memo } from "react";
import Tree from "react-d3-tree";
import hotkeys from "hotkeys-js";
/**
 * Issue: When D3 tree receives the nested property from state(data) it will create an _children that is *hidden*;
 * when deleting children nodes, _children would replace the children property inside of the node; 
 * Example: (3 children nodes under one parent, when deleting the 3 children nodes everything worked smoothly when deleting 2 children but when deleting the last child; the _children will replace the empty children array with all 3 children)
 * Solution: Recursively found if the length of the children array was empty, if so delete _children;
 */
function deleteNull_ChildrenFromD3Tree(data) {
  if (!data) return;
  if (!data.children) {
    if (data.parent && data.parent.children) {
      data.parent.children = data.parent.children.filter(el => el !== null);
    }
    delete data.children;
    return;
  }
  if (data.children && !data.children.length) {
    delete data._children;
    return;
  }
  for (let i = 0; i < data.children.length; i += 1) {
    if (data.children[i] === null) {
      data.children.splice(i, 1);
      continue;
    }
    deleteNull_ChildrenFromD3Tree(data.children[i]);
  }
  if (data.children.includes(null)) {
    deleteNull_ChildrenFromD3Tree(data);
  }
}
/**
 * hotkeys fn() : Hotkey feature, event handlers listening to key down presses of the options.
 * 
 * useEffect hook(): Clear data object on unmount 
 */
const VisualContainer = ({
  translate,
  orientation,
  setCurrentComponent,
  undo,
  redo,
  currentSubTreeDisplayToUser,
  showSubTree,
}) => {
  deleteNull_ChildrenFromD3Tree(currentSubTreeDisplayToUser);
  const undoFunc = undo;
  const redoFunc = redo;
  hotkeys("ctrl+z, ctrl+shift+z", function (event, handler) {
    event.preventDefault();
    switch (handler.key) {
      case "ctrl+z":
        undoFunc();
        break;
      case "ctrl+shift+z":
        redoFunc();
        break;
    }
    showSubTree();
  });
  useEffect(() => {
    return () => {
      showSubTree(0);
    }
  }, [])
  return (
    <div id="visual-container" >
      <Tree
        data={currentSubTreeDisplayToUser !== undefined ? currentSubTreeDisplayToUser : alert('reload the page')}
        translate={translate}
        orientation={orientation}
        collapsible={false}
        nodeSvgShape={{
          shape: "rect",
          shapeProps: {
            width: 30,
            height: 30,
            x: -15,
            y: -15
          }
        }}
        textLayout={{
          textAnchor: "start",
          x: 0,
          y: -30
        }}
        onClick={currentComponent => {
          setCurrentComponent(currentComponent);
        }}
        transitionDuration={500}
      />
    </div>

  );

}
export default memo(VisualContainer);

