const appComponent = {
    name: "App",
    depth: 0,
    id: 0,
    componentId: 0,
    isContainer: true,
    children: []
};

const childComponent1 = {
    name: "test",
    depth: 1,
    id: 1,
    componentId: 1,
    parent: appComponent,
    isContainer: false,
    children: []
}

const childComponent2 = {
    name: "test",
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
    children: [childComponent1, childComponent2]
};

export const initialStateMock = {
    data: appComponent,
    translate: { x: 0, y: 0 },
    history: {
        value: appComponent,
        prev: null,
        next: null
    },
    currentComponent: appComponent,
    nameAndCodeLinkedToComponentId: {},
    lastId: 0,
    defaultNameCount: 0,
    templates: [],
    orientation: "vertical"
};

export const stateWithChildMock = {
    data: appComponentWithChild,
    translate: { x: 0, y: 0 },
    history: {
        value: appComponentWithChild,
        prev: appComponent,
        next: null
    },
    currentComponent: childComponent1,
    nameAndCodeLinkedToComponentId: {},
    lastId: 0,
    defaultNameCount: 0,
    templates: [],
    orientation: "vertical"
}
