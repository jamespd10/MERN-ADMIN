import { Home, SignIn, SignUp } from '../../pages';
const routes = [
    {
        path: "/",
        exact: true,
        component: Home,
        name: 'Home',
        private: false,
    },
    {
        path: "/signin",
        component: SignIn,
        name: 'Ingresar',
        private: false,
    },
    {
        path: "/signup",
        component: SignUp,
        name: 'Registrar',
        private: false,
    },
];

export { routes };