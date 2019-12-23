import Component from "./component.js";
import store from "/store/index.js";
import BackendService from "./backend.js";

export default class LoginComponent extends Component{
    constructor(app, settings) {
        const template = document.getElementById('login').content.cloneNode(true);
        app.appendChild(template);
        super(
            store,
            app
        );
        let server = new BackendService(store);
        app.querySelector('#signIn').addEventListener('click', () => {
            server.loginIn(settings)
        });
    }

    render() {
        console.log('login render');
    }
}