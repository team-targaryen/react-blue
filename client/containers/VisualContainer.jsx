import React from "react";
import Tree from "react-d3-tree";
import hotkeys from "hotkeys-js";

function getRidOfStupidChildren(data) {
//  console.log('inside children', data)
  if (!data.children) {
    console.log('inside if statement', data)
    if(data.parent && data.parent.children){
      data.parent.children = data.parent.children.filter(el => el !== null);
    }
    
    delete data.children;
    return;
  }
  if (data.children && !data.children.length) {
    
    delete data._children;
    return;
  }
  data.children.forEach(node => {
    
    getRidOfStupidChildren(node);
    console.log('THIS:', node)
    // getRidOfNullsFromStupidParent(node.parent)
  });
  // getRidOfNullsFromStupidParent(data.parent)

}

const VisualContainer =({  
  data,
  translate,
  orientation,
  setCurrentComponent,
  undo,
  redo})=> {
      const undoFunc = undo;
      const redoFunc = redo;
      hotkeys("ctrl+z, ctrl+shift+z", function (event, handler) {
        event.preventDefault();
        switch (handler.key) {
          case "ctrl+z":
            undoFunc();
            return;

          case "ctrl+shift+z":
            redoFunc();
            break;
        }
      });
      getRidOfStupidChildren(data);
      return (
        <div id="visual-container">
          <Tree
            data={data}
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

  export default VisualContainer;
