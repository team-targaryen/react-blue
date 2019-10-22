import React, {useMemo} from "react";
import Tree from "react-d3-tree";
import hotkeys from "hotkeys-js";

function getRidOfStupidChildren(data, actualData) {
  if (!data.children) {
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
  for (let i = 0; i < data.children.length; i += 1){
    if (data.children[i] === null){
      data.children.splice(i, 1);
      continue;
    }
    getRidOfStupidChildren(data.children[i], actualData);
  }
  if (data.children.includes(null)){
    getRidOfStupidChildren(data, actualData);
  }
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
      useMemo(()=>{
        getRidOfStupidChildren(data, data);
      }, [data]) 
      return useMemo(()=>{
        return (
        <div id="visual-container">
        {console.log('inside useMemo', data)}
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
      }, [data, translate, orientation])
    }
  export default VisualContainer;
