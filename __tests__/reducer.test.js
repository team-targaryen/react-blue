import mainReducer from '../client/reducers/mainReducer';
import {
    initialStateMock,
    stateWithChildMock,
    stateWithChildrenMock,
    initialHistory,
    currentHistory,
    nextHistory
} from '../__mock__/stateMocks';
import * as types from '../client/constants/actionTypes';
window.alert = jest.fn();

describe('validation of main reducer', () => {
    it('should return the initial state when the action is not found', () => {
        expect(mainReducer(initialStateMock, {
            type: "NO_SUCH_ACTION"
        })).toEqual(initialStateMock);
    });
});

describe('renameComponent', () => {
    const renameComponentState = mainReducer(initialStateMock, {
        type: types.RENAME_COMPONENT,
        payload: {
            inputName: 'Test'
        }
    })
    it('should return the state with new current component name "Test"', () => {
        expect(renameComponentState.currentComponent.name).toEqual('Test');
    });
    it('should mutate data tree with new input name', () => {
        expect(renameComponentState.data.name).toEqual('Test');
    });
});

describe('changeType', () => {
    const changeTypeState = mainReducer(initialStateMock, {
        type: types.CHANGE_TYPE,
        payload: {
            isContainer: false
        }
    })
    it('should return the state with current component is not container', () => {
        expect(changeTypeState.currentComponent.isContainer).toEqual(false);
    });
    it('should mutate data tree with container type', () => {
        expect(changeTypeState.data.isContainer).toEqual(false);
    });
});

describe('deleteComponent', () => {
    const deleteComponentState = mainReducer(stateWithChildrenMock, {
        type: types.DELETE_COMPONENT
    });
    it('should return state with data that has only one child ', () => {
        expect(deleteComponentState.data.children).toHaveLength(1);
    });
    it('should delete the correct child component and reset the index of children array', () => {
        expect(deleteComponentState.data.children[0].name).toEqual('childComponent1');
    });
    it('should have current component that assigned by the parent of the deleted component', () => {
        expect(deleteComponentState.currentComponent.componentId).toEqual(0);
    });
    const deleteRootComponentState = mainReducer(initialStateMock, {
        type: types.DELETE_COMPONENT
    })
    it('should not be able to delete root component', () => {
        window.alert.mockClear();
        expect(deleteRootComponentState.currentComponent).toEqual(initialStateMock.currentComponent);
    });
});

describe('setCurrentComponent', () => {
    const setCurrentComponentState = mainReducer(stateWithChildrenMock, {
        type: types.SET_CURRENT_COMPONENT,
        payload: {
            currentComponent: {
                name: "CurrentComponentTest",
                depth: 1,
                id: 3,
                componentId: 2,
                parent: {},
                isContainer: false,
                children: []
            }
        }
    });
    it('should return state with current component named "CurrentComponentTest"', () => {
        expect(setCurrentComponentState.currentComponent.name).toEqual("CurrentComponentTest");
    });
    it('should have not mutated original data', () => {
        expect(setCurrentComponentState.data).toEqual(stateWithChildrenMock.data);
    });
});

describe('setTransAndHistory', () => {
    const setTransAndHistoryState = mainReducer(initialStateMock, {
        type: types.SET_TRANS_AND_HISTORY,
        payload: {
            translate: {x: 100, y: 100},
            history: currentHistory
        }
    });
    it('should set the translate of initial state to x:100 and y:100', () => {
        expect(setTransAndHistoryState.translate.x).toBe(100);
        expect(setTransAndHistoryState.translate.y).toBe(100);
    });
    it('should set the history of initial state to current history', () => {
        expect(setTransAndHistoryState.history).toEqual(currentHistory);
    })
});

describe('undo', () => {
    const undoState = mainReducer(stateWithChildrenMock, {
        type: types.UN_DO
    });
    it('should set the state back to the previous state', () => {
        expect(undoState).toEqual(stateWithChildMock);
    });

});