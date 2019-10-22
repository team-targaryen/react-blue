import { DoublyLinkedList } from '../client/reducers/utils/updateTree'

const appComponent = {
    name: "App",
    depth: 0,
    id: 0,
    componentId: 0,
    isContainer: true,
    children: []
};

const childComponent1 = {
    name: "childComponent1",
    depth: 1,
    id: 1,
    componentId: 1,
    parent: appComponent,
    isContainer: false,
    children: []
}

const childComponent2 = {
    name: "childComponent2",
    depth: 1,
    id: 2,
    componentId: 2,
    parent: appComponent,
    isContainer: false,
    children: []
}

const appComponentWithChild = {
    name: "App",
    depth: 0,
    id: 0,
    componentId: 0,
    isContainer: true,
    children: [childComponent1]
};

const appComponentWithChildren = {
    name: "App",
    depth: 0,
    id: 0,
    componentId: 0,
    isContainer: true,
    children: [childComponent1, childComponent2]
};

const initialNode = new DoublyLinkedList({
    data: appComponent,
    translate: { x: 0, y: 0 },
    currentComponent: appComponent,
    nameAndCodeLinkedToComponentId: {},
    lastId: 0,
    defaultNameCount: 0
});

const currentNode = new DoublyLinkedList({
    value: new DoublyLinkedList({
        data: appComponentWithChild,
        translate: { x: 50, y: 50 },
        currentComponent: appComponentWithChild,
        nameAndCodeLinkedToComponentId: {},
        lastId: 1,
        defaultNameCount: 0
    }),
});

const nextNode = new DoublyLinkedList({
    data: appComponentWithChildren,
    translate: { x: 50, y: 50 },
    currentComponent: appComponentWithChildren,
    nameAndCodeLinkedToComponentId: {},
    lastId: 2,
    defaultNameCount: 0
});

export const initialHistory = {
    value: initialNode,
    prev: null,
    next: null
}

export const currentHistory = {
    value: currentNode,
    prev: initialNode,
    next: nextNode
}

export const nextHistory = {
    value: nextNode,
    prev: currentNode,
    next: null
}


export const initialStateMock = {
    data: appComponent,
    translate: { x: 0, y: 0 },
    history: initialHistory,
    currentComponent: appComponent,
    nameAndCodeLinkedToComponentId: {},
    lastId: 0,
    defaultNameCount: 0,
    templates: [],
    orientation: "vertical"
};

export const stateWithChildMock = {
    data: appComponentWithChild,
    translate: { x: 50, y: 50 },
    history: currentHistory,
    currentComponent: childComponent1,
    nameAndCodeLinkedToComponentId: {},
    lastId: 1,
    defaultNameCount: 0,
    templates: [],
    orientation: "vertical"
}

export const stateWithChildrenMock = {
    data: appComponentWithChildren,
    translate: { x: 50, y: 50 },
    history: nextHistory,
    currentComponent: childComponent2,
    nameAndCodeLinkedToComponentId: {},
    lastId: 2,
    defaultNameCount: 0,
    templates: [],
    orientation: "vertical"
}
