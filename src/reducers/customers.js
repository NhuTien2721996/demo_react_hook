import * as types from './../constants/ActionTypes'

function s4() {
    return Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1);
}

function generateID() {
    return s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4();
}
function findIndex(data,id) {
    const newCustomers = data;
    let result = -1;
    newCustomers.forEach((customer, index) => {
        if (customer.id === id) {
            result = index
        }
    });
    return result;
}

let data = JSON.parse(localStorage.getItem('customers'));
let initialState = data ? data : [];
let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_CUSTOMER:
            let customer={
              id:action.customer.id,
              name:action.customer.name,
              gender:action.customer.gender,
              age:action.customer.age,
              address:action.customer.address,
              room:action.customer.room,
            };
            if (!customer.id){
                customer.id=generateID();
                state.push(customer);
            }else {
                let index=findIndex(state,action.customer.id);
                state[index]=customer;
            }
            localStorage.setItem('customers',JSON.stringify(state));
            return [...state];
        case types.DELETE_CUSTOMER:
            let index=findIndex(state,action.customer.id);
            state.splice(index,1);
            localStorage.setItem('customers',JSON.stringify(state));
            return [...state];
        default:
            return state
    }
};

export default myReducer;


