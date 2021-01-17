import { Contador, Home, Admin } from '../../pages';
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
        private: true,
    },
    {
        path: "/admin",
        component: Admin,
        name: 'Administración',
        private: true,
    },
];

export { routes };