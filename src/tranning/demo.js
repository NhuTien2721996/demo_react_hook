import {createStore} from "redux";

let initialState = {
    status: false,
    sort: {
        by: 'name',
        value: 1
    }
};
let myReducer = (state = initialState, action) => {
    if (action.type === 'TOGGLE_STATUS') {
        state.status = !state.status;
    }
    if (action.type === "SORT") {
       let {by,value}=action.sort;
       let {status}=state;
       return {
           status: status,
           sort: {
               by,
               value
           }
       }
    }
    return state;
};
const store = createStore(myReducer);
console.log("default", store.getState());


let action = {type: "TOGGLE_STATUS"};
store.dispatch(action);

let sortAction = {
    type: "SORT",
    sort: {
        by: 'name',
        value: -1
    }
};
store.dispatch(sortAction);
console.log("SORT:", store.getState());
