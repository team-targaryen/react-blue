// Props of children list
// Renders each child

import React, {Component} from 'react';
import clone from 'clone';

import EachChild from './EachChild.jsx';

class ChildrenList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            childrenList: clone(this.props.currentComponent.children),
            lastId: this.props.lastId,
        }

        this.renameChild = this.renameChild.bind(this);
        this.changeType = this.changeType.bind(this);
        this.deleteChild = this.deleteChild.bind(this);
        this.addChild = this.addChild.bind(this);
    }

    // componentDidMount() {
    //     console.log('here in component did mount')
    //         this.setState({
    //             childrenList: clone(this.props.childrenList),
    //             lastId: this.props.lastId
    //         })
    // }

    renameChild(event, childId) {
        let childrenList = clone(this.state.childrenList);
        for(let child of childrenList) {
            if(child.id === childId) {
                child.name = event.target.value 
            }
        }
        this.setState({childrenList});
    }

    changeType(event, childId) {
        let childrenList = clone(this.state.childrenList);
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

        // console.log("newChild: ", newChild);

        let childrenList = clone(this.state.childrenList);
        childrenList.push(newChild);
        this.setState({
            childrenList,
            lastId
        });
    }
    
    deleteChild(childId) {
       let childrenList = clone(this.state.childrenList);
       for (let x = 0; x < childrenList.length; x++){
           if (childrenList[x].id === childId){
               childrenList.splice(x, 1);
           }
       }
       this.setState({childrenList});
    };

    render() {
        console.log('this.props.currentComponent.children: ', this.props.currentComponent.children);
        console.log('children list: ', this.state.childrenList);
        let displayChildrenInDropDown = this.props.currentComponent.children.map((child, idx) => ChildMaker(child, idx, this.renameChild, this.changeType, this.deleteChild))

        // console.log('childrenList: ', this.state.childrenList);
        return (
           <div className="childrenList">
               <h3>Children List</h3>
               <form onSubmit={this.addChild}>
                    <input type="text" id="addChildName" name="childName" placeholder="Enter Child's Name"/>
                    <input id="addChildContainerCheckbox" name="checkbox" type="checkbox" />
                    <span className="containerLabel">Container</span>
                    <button type="submit">+</button>
               </form>
               {console.log('here in render line 97', this.props.currentComponent)}
               {displayChildrenInDropDown}
               <button onClick={()=>this.props.updateChildrenList(this.state.childrenList, this.state.lastId)}>Update Children</button>
           </div>
        );
    } 
}

const ChildMaker = (child, idx, renameChild, changeType, deleteChild) => {
    console.log('in childMaker');
    return(
    <EachChild 
        key={`${idx}`}
        name={child.name}
        childId={child.id}
        isContainer={child.isContainer}
        renameChild={renameChild}
        changeType={changeType}
        deleteChild={deleteChild}
    />
)}

export default ChildrenList;