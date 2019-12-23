import ListComponent from "./list-component.js";
import LoginComponent from "./login-component.js";

export default {
    'login': {
        data: { route: 'login' },
        url: 'login',
        component: LoginComponent,
        settings: {
            redirect: 'list'
        }
    },
    'list': {
        data: {  route: 'list' },
        url: 'list',
        component: ListComponent,
        settings: {}
    }
}