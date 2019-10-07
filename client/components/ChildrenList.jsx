// Props of children list
// Renders each child

import React, {Component} from 'react';

import EachChild from './EachChild.jsx';

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
        this.addChild = this.addChild.bind(this);
    }

    renameChild(event, childId) {
        let childrenList = this.state.childrenList.slice();
        for(let child of childrenList) {
            if(child.id === childId) {
                child.name = event.target.value 
            }
        }
        this.setState({childrenList});
    }

    changeType(event, childId) {
        let childrenList = this.state.childrenList.slice();
        for(let child of childrenList) {
            if(child.id === childId) {
                child.isContainer = event.target.checked; 
            }
        }
        this.setState({childrenList});    
    };

    addChild(event) {
        event.preventDefault();
        const name = event.target.childName.value || "DEFAULT NAME";
        document.getElementById("addChildName").value = '';
        const lastId = this.state.lastId + 1;

        const id = lastId;
        const isContainer = event.target.checkbox.checked;
        document.getElementById("addChildContainerCheckbox").checked = false;
        const newChild = {
            name,
            id,
            isContainer,
            children: []
        }

        console.log("newChild: ", newChild);

        let childrenList = this.state.childrenList.slice();
        childrenList.push(newChild);
        this.setState({
            childrenList,
            lastId
        });
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
                    <input id="addChildContainerCheckbox" name="checkbox" type="checkbox" />
                    <span className="containerLabel">Container</span>
                    <button type="submit">+</button>
               </form>
               <button onClick={()=>this.props.updateChildrenList(this.state.childrenList, this.state.lastId)}>Update Children</button>
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