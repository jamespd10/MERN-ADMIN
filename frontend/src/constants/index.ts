import { createContext } from 'react';

type Usuario = {
    apellido?: string
    email?: string
    id?: string
    nombre?: string
    usuario?: string
}

export const UserContext = createContext({ userData: {}, setUserData(value: Usuario) { } });