import React, { useMemo } from "react";
import Tree from "react-d3-tree";
import hotkeys from "hotkeys-js";

function getRidOfStupidChildren(data, actualData) {
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
    getRidOfStupidChildren(data.children[i], actualData);
  }
  if (data.children.includes(null)) {
    getRidOfStupidChildren(data, actualData);
  }
}

const VisualContainer = ({
  data,
  translate,
  orientation,
  setCurrentComponent,
  undo,
  redo,
  currentSubTreeDisplayToUser,
  showSubTree,
  currentlyDisplayedSubTreeId
}) => {
  useMemo(() => {
    getRidOfStupidChildren(currentSubTreeDisplayToUser, currentSubTreeDisplayToUser);
  }, [currentSubTreeDisplayToUser]);
  const undoFunc = undo;
  const redoFunc = redo;
  console.log('in fn scope', currentlyDisplayedSubTreeId)
  hotkeys("ctrl+z, ctrl+shift+z", function (event, handler) {
    // console.log('outside of switch statement', currentlyDisplayedSubTreeId)
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
  // return useMemo(() => {
    return (
      <div id="visual-container" >
         {/*console.log('inside useMemo for Visual Container', data)*/}
        <Tree
          data={currentSubTreeDisplayToUser}
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
            // console.log('here inside of onclick')
            setCurrentComponent(currentComponent);
          }}
          transitionDuration={500}
        />
      </div>

    );
  // }, [currentSubTreeDisplayToUser, translate, orientation])
}
export default React.memo(VisualContainer);

