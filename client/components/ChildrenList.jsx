// Props of children list
// Renders each child

import React, {Component} from 'react';

import EachChild from './EachChild.jsx';
import { renameComponent } from '../actions/actions.js';

class ChildrenList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            childrenList: this.props.currentComponent.children,
            lastId: this.props.lastId
        }

        this.renameChild = this.renameChild.bind(this);
        this.changeType = this.changeType.bind(this);
        this.deleteChild = this.deleteChild.bind(this);

    }

    renameChild(event, childId) {
        let childrenList = this.state.childrenList.slice();
        for(let child of childrenList) {
            if(child.id === childId) {
                child.name = event.target.value || "DEFAULT NAME"
            }
        }
        this.setState({childrenList});
    }

    changeType(isContainer) {
        console.log(isContainer);
    };

    addChild(event) {
        event.preventDefault();
        console.log(event.target.checkbox.value);
        // const name = event.target.childName.value;
        document.getElementById("addChildName").value = '';
        // const id = lastId;
        // const lastId = this.state.lastId + 1;
        // const newChild = {
        //     name,
        //     id,
        //     isContainer: event.target
        // }

    }
    
    deleteChild(childId) {
       let childrenList = this.state.childrenList.slice();
       for (let x = 0; x < childrenList.length; x++){
           if (childrenList[x].id === childId){
               childrenList.splice(x, 1);
           }
       }
       this.setState({childrenList});
    };

    render() {
        return (
           <div className="childrenList">
               <h3>Children List</h3>
               {this.state.childrenList.map((child, idx) => childMaker(child, idx, this.renameChild, this.changeType, this.deleteChild))}
               <form onSubmit={this.addChild}>
                    <input type="text" id="addChildName" name="childName" placeholder="Enter Child's Name"/>
                    <input className="containerCheckbox" name="checkbox" type="checkbox" />
                    <span className="containerLabel">Container</span>
                    <button type="submit">+</button>
               </form>
               <button onClick={()=>this.props.updateChildrenList(this.state.childrenList, this.state.lastId)}>Update State</button>
           </div>
        );
    } 
}

const childMaker = (child, idx, renameChild, changeType, deleteChild) => (
    <EachChild 
        key={idx}
        name={child.name}
        childId={child.id}
        isContainer={child.isContainer}
        renameChild={renameChild}
        changeType={changeType}
        deleteChild={deleteChild}
    />
)

export default ChildrenList;