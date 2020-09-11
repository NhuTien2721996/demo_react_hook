import * as types from './../constants/ActionTypes'

let initialState = 1;
let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT:
            return action.sort;
        default:
            return state
    }
};

export default myReducer;


