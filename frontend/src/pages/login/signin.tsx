import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

type Inputs = {
    usuario: string,
    password: any,
};

const SignIN: React.FC = (props: any) => {
    useEffect(() => {
        document.title = props.title;
    });
    const { register, handleSubmit, errors, watch } = useForm<Inputs>({ mode: 'all' });
    const watchUsuario = watch("usuario");
    const watchPassword = watch("password");
    const onSubmit = (data: React.FormEvent<HTMLFormElement>) => {
        console.log(data);
        setSubmit(true);
        setTimeout(function () { setSubmit(false); }, 3000);
    }
    const [isSubmit, setSubmit] = useState(false);
    return (
        <Fragment>
            {
                isSubmit ? <div className="loader-page"></div> :
                    <div className="container my-4">
                        <h1>{props.title}</h1>
                        <div className="row justify-content-center">
                            <div className="col-md-5">
                                <div className="card">
                                    <div className="card-header text-center"><h5>FORMULARIO DE INGRESO</h5></div>
                                    <div className="card-body">
                                        <form method="post" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-group">
                                                <label htmlFor="usuario">Usuario</label>
                                                <input
                                                    className={errors.usuario ? 'form-control is-invalid' : 'form-control'}
                                                    type="text" name="usuario" id="usuario" placeholder="Usuario"
                                                    ref={register({
                                                        required: "el usuario es requerido",
                                                    })}
                                                />
                                                {watchUsuario}
                                                {errors.usuario && <div className="invalid-feedback">{errors.usuario.message}</div>}
                                            </div>
                                            <div className="form-group my-2">
                                                <label htmlFor="password">Contraseña</label>
                                                <input
                                                    className={errors.password ? 'form-control is-invalid' : 'form-control'}
                                                    type="password" name="password" id="password" placeholder="Contraseña"
                                                    ref={register({
                                                        required: "la contraseña es requerida",
                                                    })}
                                                />
                                                {watchPassword}
                                                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                                            </div>
                                            <div className="d-grid gap-2 col-6 mx-auto">
                                                <button className="btn btn-primary" type="submit">INGRESAR</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </Fragment >
    );
}

export default SignIN;