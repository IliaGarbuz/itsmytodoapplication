export default function createReducers() {
    return {
        login: (payload, state) => ({
           ...state,
           userInfo: {
               autorized: true,
               ...payload,
           } 
        }),
        logout: (payload, state) => ({
            ...state,
            userInfo: {}
        }),
        addItem: (payload, state) => ({
            ...state,
            todo: [ payload, ...state.todo ]
        }),
        removeItem: (payload, state) => ({
            ...state,
            todo: [
                ...state.todo.slice(0, payload.id),
                ...state.todo.slice(payload.id + 1, state.todo.length),
            ]
        }),
        markItem: (payload, state) => ({
            ...state,
            todo : [ ...state.todo].map((elem,id) => {
                if(id == payload.id){
                    elem += " ";
                }
                return elem;
            })
        }),
        editItem: (payload, state) => ({
            ...state,
            todo: [...state.todo].map((elem, id) => {
                if(id == payload.id) {
                    elem = payload.value;
                }
                return elem;
            })
        }),
    }
}