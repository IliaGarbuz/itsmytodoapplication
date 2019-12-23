import Component from "./component.js";
import store from "/store/index.js";
import BackendService from "./backend.js";

export default class ListComponent extends Component {
    constructor(app, settings) {
        const template = document.getElementById('list').content.cloneNode(true);
        app.append(template);
        super(
            store,
            document.querySelector('.todo-items')
        );
        const server= new BackendService(store);
        const input = document.querySelector('.input-field');
        const submit = document.querySelector('.button-add');
        const handleClick = event => {
            event.preventDefault();

            let value = input.value.trim();

            if (value.length) {
                server.createTodo(value);
                server.getTodo();
                input.focus();
                input.value = '';
            }
        }
        submit.addEventListener('click', handleClick)
    }

    render() {
        if (store.state.todo.length == 0) {
            this.anchor.innerHTML = 'No todos';
            this.counterTodo();
            return;
        }

        this.anchor.innerHTML = `
            <ul>
                ${
                    store.state.todo.map(todoItem => `
                        <li><span class="undonetodo">${todoItem}</span><button class="delete" type="button">Del</button>
                        <button class="mark" type="button">Mark</button></li>
                    `).join('')
                }   
            </ul>
        `;
        this.setupListeners();
        this.counterTodo();
        this.editTodo();
        this.filterTodo();
    }
    
    editTodo() {
        this.anchor.querySelectorAll('span').forEach((item, id) => {
            
            item.addEventListener('click', () => {
                let inputEdit = document.createElement('input');
                item.parentNode.prepend(inputEdit);
                inputEdit.focus();
                item.remove();
                inputEdit.addEventListener('keypress', (event) => {
                    let value = inputEdit.value.trim();
                    if (value.length){     
                        if(event.keyCode === 13)
                        store.dispatch('editItem', { value, id })
                    }
                })     
            })
        })
    }
    
    filterTodo(){
        document.getElementById('alltodos').addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelectorAll('li').forEach((item) => {
                item.style.display = "none";
            })  
            document.querySelectorAll('span').forEach((item) => {
                item.parentNode.style.display = "list-item";
            });
        })
        document.getElementById('alldone').addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelectorAll('li').forEach((item) => {
                item.style.display = "none";
            })
            document.querySelectorAll('span.donetodo').forEach((item) => {
                item.parentNode.style.display = "list-item";
            });
        })
        document.getElementById('allundone').addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelectorAll('li').forEach((item) => {
                item.style.display = "none";
            })
            document.querySelectorAll('span.undonetodo').forEach((item) => {
                item.parentNode.style.display = "list-item";
            }); 
        })
    }

    counterTodo() {
        const counterAll = document.querySelector('.alltodo-counter');
        counterAll.innerHTML = store.state.todo.length;
        const counterDone = document.querySelector('.donetodo-counter');
        counterDone.innerHTML = document.querySelectorAll('span.donetodo').length;
        const counterUndone = document.querySelector('.undonetodo-counter');
        counterUndone.innerHTML = store.state.todo.length - document.querySelectorAll('span.donetodo').length;
    }

    setupListeners() {
        this.anchor.querySelectorAll('li').forEach((item) => {
            
            item.addEventListener('mouseover', () =>
                item.querySelectorAll('button').forEach(button => button.style.display = "inline")
            )
            item.addEventListener('mouseout', () =>
                item.querySelectorAll('button').forEach(button => button.style.display = "none")
            )
            if(item.querySelector('span').innerText.substr(-1) == " "){
                item.querySelector('span').style.textDecoration = "line-through";
                item.querySelector('span').style.color = "red";
                item.querySelector('span').className = "donetodo";
            }
        })

        this.anchor.querySelectorAll('button.delete').forEach((button, id) => {

            button.style.display = "none";

            button.addEventListener('click', () =>
                store.dispatch('removeItem', { id })
            )
        })

        this.anchor.querySelectorAll('button.mark').forEach((button, id) => {

            button.style.display = "none";

            button.addEventListener('click', () =>
                store.dispatch('markItem', { id })
            )
        })
    }

}