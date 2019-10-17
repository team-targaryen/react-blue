import mainReducer from '../client/reducers/mainReducer';
import {
    initialStateMock,
    stateWithChildMock
} from '../__mock__/stateMocks';
import * as types from '../client/constants/actionTypes';

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
})

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
})

describe('deleteComponent', () => {
    const deleteComponentState = mainReducer(stateWithChildMock, {
        type: types.DELETE_COMPONENT
    });
    it('should return state with data that has only one child ', () => {
        expect(deleteComponentState.data.children).toHaveLength(1);
    });
    it('should delete the right child component and reset the index of children array', () => {
        expect(deleteComponentState.data.children[0].name).toEqual('childComponent2');
    });
    it('should have current component that assigned by the parent of the deleted component', () => {
        expect(deleteComponentState.currentComponent.componentId).toEqual(0);
    });
})