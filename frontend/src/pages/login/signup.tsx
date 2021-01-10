import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import api from '../../api';
import ErrorAlert from '../../messages/error';

type Inputs = {
    nombre: string,
    apellido: string,
    usuario: string,
    email: string,
    password: string,
    passwordRepeat: string,
    telefono: string,
};

const SignUP: React.FC = (props: any) => {
    useEffect(() => {
        document.title = props.title;
    });
    const [isSubmit, setSubmit] = useState(false);
    const [isErrorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, errors, getValues } = useForm<Inputs>({ mode: 'all' });
    const onSubmit = async (data: Inputs/*, e:any*/) => {
        //e.target.reset();
        console.log(data);
        setSubmit(true);
        await api.post('/usuarios/signup', {
            nombre: data.nombre,
            apellido: data.apellido,
            usuario: data.usuario,
            email: data.email,
            password: data.password,
        })
            .then(function (response) {
                console.log(response);
                setErrorMessage('');
            })
            .catch(function (error) {
                if (error.response.data.message)
                    setErrorMessage(error.response.data.message);
                else
                    setErrorMessage("Ocurrió un error inesperado");
            });
        setSubmit(false);
    }
    return (
        <Fragment>
            {
                isSubmit ? <div className="loader-page"></div> :
                    <div className="container my-4">
                        {isErrorMessage ? <ErrorAlert message={isErrorMessage} {...props} /> : ''}
                        <h1>{props.title}</h1>
                        <div className="row justify-content-center">
                            <div className="col-sm col-md-6 col-lg-6 col-lg-6">
                                <div className="card">
                                    <div className="card-header text-center"><h5>FORMULARIO DE REGISTRO</h5></div>
                                    <div className="card-body">
                                        <form method="post" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group mb-2">
                                                        <label htmlFor="nombre">Nombre</label>
                                                        <input
                                                            className={errors.nombre ? 'form-control is-invalid' : 'form-control'}
                                                            type="text" name="nombre" id="nombre" placeholder="Nombre"
                                                            ref={register({
                                                                required: 'el nombre es requerido',
                                                                minLength: {
                                                                    value: 3,
                                                                    message: 'el nombre debe tener minimo de 3 caracteres'
                                                                },
                                                                maxLength: {
                                                                    value: 20,
                                                                    message: 'el apellido debe tener maximo de 20 caracteres'
                                                                },
                                                                pattern: {
                                                                    value: /^[A-Za-z]+$/i,
                                                                    message: 'el nombre debe contener solo letras'
                                                                }
                                                            })}
                                                        />
                                                        {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-lg">
                                                    <div className="form-group my-md-2 my-lg-0">
                                                        <label htmlFor="apellido">Apellido</label>
                                                        <input
                                                            className={errors.apellido ? 'form-control is-invalid' : 'form-control'}
                                                            type="text" name="apellido" id="apellido" placeholder="Apellido"
                                                            ref={register({
                                                                required: 'el apellido es requerido',
                                                                minLength: {
                                                                    value: 3,
                                                                    message: 'el apellido debe tener minimo de 3 caracteres'
                                                                },
                                                                maxLength: {
                                                                    value: 20,
                                                                    message: 'el apellido debe tener maximo de 20 caracteres'
                                                                },
                                                                pattern: {
                                                                    value: /^[A-Za-z]+$/i,
                                                                    message: 'el apellido debe contener solo letras'
                                                                }
                                                            })}
                                                        />
                                                        {errors.apellido && <div className="invalid-feedback">{errors.apellido.message}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group my-2">
                                                <label htmlFor="usuario">Usuario</label>
                                                <input
                                                    className={errors.usuario ? 'form-control is-invalid' : 'form-control'}
                                                    type="text" name="usuario" id="usuario" placeholder="Usuario"
                                                    ref={register({
                                                        required: 'el usuario es requerido',
                                                        minLength: {
                                                            value: 3,
                                                            message: 'el usuario debe tener minimo de 3 caracteres'
                                                        },
                                                        maxLength: {
                                                            value: 20,
                                                            message: 'el usuario debe tener maximo de 20 caracteres'
                                                        },
                                                        pattern: {
                                                            value: /^[A-Za-z0-9]+$/i,
                                                            message: 'el usuario debe contener solo números y letras'
                                                        }
                                                    })}
                                                />
                                                {errors.usuario && <div className="invalid-feedback">{errors.usuario.message}</div>}
                                            </div>
                                            <div className="form-group my-2">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    className={errors.email ? 'form-control is-invalid' : 'form-control'}
                                                    type="text" name="email" id="email" placeholder="Email"
                                                    ref={register({
                                                        required: 'el correo es requerido',
                                                        minLength: {
                                                            value: 3,
                                                            message: 'el correo debe tener minimo de 3 caracteres'
                                                        },
                                                        maxLength: {
                                                            value: 20,
                                                            message: 'el correo debe tener maximo de 20 caracteres'
                                                        },
                                                        pattern: {
                                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                                            message: 'el correo debe ser un correo válido'
                                                        }
                                                    })}
                                                />
                                                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                            </div>
                                            <div className="form-group my-2">
                                                <label htmlFor="password">Contraseña</label>
                                                <input
                                                    className={errors.password ? 'form-control is-invalid' : 'form-control'}
                                                    type="password" name="password" id="password" placeholder="Contraseña"
                                                    ref={register({
                                                        required: 'la contraseña es requerida',
                                                        minLength: {
                                                            value: 8,
                                                            message: 'la contraseña debe tener minimo de 8 caracteres'
                                                        },
                                                        maxLength: {
                                                            value: 16,
                                                            message: 'la contraseña debe tener maximo de 16 caracteres'
                                                        },
                                                        pattern: {
                                                            value: /^[A-Za-z0-9]+$/i,
                                                            message: 'la contraseña debe contener solo números y letras'
                                                        }
                                                    })}
                                                />
                                                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="passwordRepeat">Repetir Contraseña</label>
                                                <input
                                                    className={errors.passwordRepeat ? 'form-control is-invalid' : 'form-control'}
                                                    type="password" name="passwordRepeat" id="passwordRepeat" placeholder="Repetir Contraseña"
                                                    ref={register({
                                                        required: 'la contraseña es requerida',
                                                        minLength: {
                                                            value: 8,
                                                            message: 'la contraseña debe tener minimo de 8 caracteres'
                                                        },
                                                        maxLength: {
                                                            value: 16,
                                                            message: 'la contraseña debe tener maximo de 16 caracteres'
                                                        },
                                                        validate: value => value === getValues('password') || 'la contraseña con coincide'
                                                    })}
                                                />
                                                {errors.passwordRepeat && <div className="invalid-feedback">{errors.passwordRepeat.message}</div>}
                                            </div>
                                            <div className="d-grid gap-2 col-6 mx-auto mt-2">
                                                <button className="btn btn-primary" type="submit">REGISTRAR</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </Fragment>
    );
}

export default SignUP;