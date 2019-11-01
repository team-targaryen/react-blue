// sidebar actions
export const RENAME_COMPONENT = 'RENAME_COMPONENT';
export const CHANGE_TYPE = 'CHANGE_TYPE';
export const DELETE_COMPONENT = 'DELETE_COMPONENT';

// main display container actions
export const SET_CURRENT_COMPONENT = 'SET_CURRENT_COMPONENT';
export const SET_TRANS_AND_HISTORY = 'SET_TRANS_AND_HISTORY';
export const UN_DO = 'UN_DO';
export const RE_DO = 'RE_DO';

// change display of d3 tree
export const CHANGE_DISPLAY_HORIZONTAL_OR_VERTICAL =
  'CHANGE_DISPLAY_HORIZONTAL_OR_VERTICAL';

// children list actions
export const SET_CHILDREN = 'SET_CHILDREN';
export const RENAME_CHILD = 'RENAME_CHILD';
export const CHANGE_CHILD_TYPE = 'CHANGE_CHILD_TYPE';
export const ADD_CHILD = 'ADD_CHILD';
export const DELETE_CHILD = 'DELETE_CHILD';

// file tree
export const SHOW_FILE_TREE = 'SHOW_FILE_TREE';

//templating feature
export const USE_TEMPLATES = 'USE_TEMPLATES';
export const SET_TEMPLATES_FOR_COMPONENT = 'SET_TEMPLATES_FOR_COMPONENT';

//ZOOM feature
export const ZOOM_BY_CHANGING_X_AND_Y = 'ZOOM_BY_CHANGING_X_AND_Y';

//checking if the entire tree exists inside of local storage and updating it to the state
export const UPDATE_STATE_WITH_LOCAL_STORAGE =
  'UPDATE_STATE_WITH_LOCAL_STORAGE';

//deleting entire tree
export const RESET_ENTIRE_TREE = 'RESET_ENTIRE_TREE';

// setTimeout functionality of Local Storage
export const SET_TIMEOUT_ID = 'SET_TIMEOUT_ID';

//display sub tree
export const SHOW_SUBTREE = 'SHOW_SUBTREE';
export const ADD_OR_DELETE_NEW_SUB_TREE = 'ADD_OR_DELETE_NEW_SUB_TREE';
export const DELETE_SUBTREE_DROPDOWN_ITEM = 'DELETE_SUBTREE_DROPDOWN_ITEM'