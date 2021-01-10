import { Contador, Home, SignIn, SignUp, Admin } from '../pages';
const routes = [
    {
        path: "/",
        exact: true,
        component: Home,
        name: 'Home',
        private: false,
    },
    {
        path: "/contador",
        component: Contador,
        name: 'Contador',
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
    {
        path: "/admin",
        component: Admin,
        name: 'Administración',
        private: true,
    },
];

export { routes };