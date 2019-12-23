import link from "./link.js";

export default class BackendService {
    constructor(store) {
        this.store = store;
    }

    loginIn(settings, email, password) {
        fetch('https://todo-app-back.herokuapp.com/login', {
            method: 'POST',
            body:
                JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            localStorage.setItem('id', res.id);
            localStorage.setItem('token', res.token);
            res.token ? link(settings.redirect) : alert("Error");
        })      
    }

    createTodo(value){
        fetch('https://todo-app-back.herokuapp.com/todos', {
            method: 'POST',
            body:
                JSON.stringify({
                    text: value,
                 }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
    })
    .then(res=>res.json())
    .then(res=>this.store.dispatch('addItem', value));
    }

    getTodo() {
        fetch('https://todo-app-back.herokuapp.com/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
    })
    .then(res=>res.json())
    .then(res=>console.log(res));
    }

}