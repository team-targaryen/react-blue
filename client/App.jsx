import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setTransAndHistory,
  updateStateWithLocalStorage,
  undo,
  redo,
  setCurrentComponent
} from "./actions/actions";
import clone from "clone";
import TopNavContainer from './containers/TopNavContainer.jsx';
import PanelContainer from './containers/PanelContainer.jsx';
import VisualContainer from './containers/VisualContainer.jsx';
function DoublyLinkedList(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
}

const mapStateToProps = store => ({
  state: store.main,
  data: store.main.data,
  translate: store.main.translate,
  orientation: store.main.orientation
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateStateWithLocalStorage,
    setTransAndHistory,
    undo,
    redo,
    setCurrentComponent
  }, dispatch
  )
const App = ({
  state,
  updateStateWithLocalStorage,
  setTransAndHistory,
  undo,
  redo,
  setCurrentComponent,
  data,
  translate,
  orientation }) => {
  useEffect(() => {
    let data = localStorage.getObj("data");
    if (data) {
      const nameAndCodeLinkedToComponentId = localStorage.getObj(
        "nameAndCodeLinkedToComponentId"
      );
      const currentComponent = localStorage.getObj("currentComponent");
      // console.log(JSON.parse(JSON.stringify(data)))
      const lastId = localStorage.getObj("lastId");
      const history = localStorage.getObj('history')
      history.prev = null;
      localStorage.setObj('history', history)
      // console.log('inside useEffect', history)
      updateStateWithLocalStorage(
        data,
        currentComponent,
        nameAndCodeLinkedToComponentId,
        lastId,
        history
      );
    }
    const initialHistory = new DoublyLinkedList(clone(state));
    const domElementForVisualContainer = document.getElementById('visual-container');
    const dimensions = domElementForVisualContainer.getBoundingClientRect();
    setTransAndHistory(
      {
        x: dimensions.width / 2,
        y: dimensions.height / 6
      },
      initialHistory
    );

  }, [])

  return (
    <React.Fragment>
      {/*console.log('Inside of App.jsx')*/}
      <TopNavContainer />
      <div id='panel-main-container'>
        <PanelContainer />
        <VisualContainer
          undo={undo}
          redo={redo}
          setCurrentComponent={setCurrentComponent}
          data={data}
          translate={translate}
          orientation={orientation} />
      </div>

    </React.Fragment>)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
