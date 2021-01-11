import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import api from '../../api';
import { ErrorAlert, SuccessAlert } from '../../messages/';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

type Inputs = {
    nombre: string,
    apellido: string,
    usuario: string,
    email: string,
    password: string,
    passwordRepeat: string,
    telefono: string,
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
);

const SignUP: React.FC = (props: any) => {
    const classes = useStyles();
    useEffect(() => {
        document.title = props.title;
    });
    const [isSubmit, setSubmit] = useState(false);
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
                setSubmit(false);
                SuccessAlert("Registro satisfactorio!");
            })
            .catch(function (error) {
                setSubmit(false);
                if (error.response)
                    ErrorAlert(error.response.data.message);
                else
                    ErrorAlert("Ocurrió un error inesperado");
            });
    }
    return (
        <Fragment>
            {
                isSubmit ? <div className="loader-page"></div> :
                    <Container maxWidth="md">
                        <h1>{props.title}</h1>
                        <Box width={1} display="flex" alignItems="center" justifyContent="center">
                            <Card>
                                <CardHeader title="FORMULARIO DE REGISTRO" style={{ textAlign: 'center' }} />
                                <CardContent>
                                    <form method="post" onSubmit={handleSubmit(onSubmit)} className={classes.root}>
                                        <div>
                                            <TextField
                                                label="Nombre"
                                                variant="outlined"
                                                type="text"
                                                name="nombre"
                                                id="nombre"
                                                inputRef={register({
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
                                                error={errors.nombre ? true : false}
                                                helperText={errors.nombre ? errors.nombre.message : null}
                                                fullWidth
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                label="Apellido"
                                                variant="outlined"
                                                type="text"
                                                name="apellido"
                                                id="apellido"
                                                inputRef={register({
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
                                                error={errors.apellido ? true : false}
                                                helperText={errors.apellido ? errors.apellido.message : null}
                                                fullWidth
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                label="Usuario"
                                                variant="outlined"
                                                type="text"
                                                name="usuario"
                                                id="usuario"
                                                inputRef={register({
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
                                                error={errors.usuario ? true : false}
                                                helperText={errors.usuario ? errors.usuario.message : null}
                                                fullWidth
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                label="Email"
                                                variant="outlined"
                                                type="email"
                                                name="email"
                                                id="email"
                                                inputRef={register({
                                                    required: 'el correo es requerido',
                                                    minLength: {
                                                        value: 3,
                                                        message: 'el email debe tener minimo de 3 caracteres'
                                                    },
                                                    maxLength: {
                                                        value: 20,
                                                        message: 'el email debe tener maximo de 20 caracteres'
                                                    },
                                                    pattern: {
                                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                                        message: 'el email debe ser un email válido'
                                                    }
                                                })}
                                                error={errors.email ? true : false}
                                                helperText={errors.email ? errors.email.message : null}
                                                fullWidth
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                label="Contraseña"
                                                variant="outlined"
                                                type="password"
                                                name="password"
                                                id="password"
                                                inputRef={register({
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
                                                error={errors.password ? true : false}
                                                helperText={errors.password ? errors.password.message : null}
                                                fullWidth
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                label="Contraseña"
                                                variant="outlined"
                                                type="password"
                                                name="passwordRepeat"
                                                id="passwordRepeat"
                                                inputRef={register({
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
                                                error={errors.passwordRepeat ? true : false}
                                                helperText={errors.passwordRepeat ? errors.passwordRepeat.message : null}
                                                fullWidth
                                            />
                                        </div>
                                        <Box width={1} display="flex" alignItems="center" justifyContent="center">
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                type="submit"
                                                endIcon={<DeleteIcon />}
                                            >
                                                REGISTRAR
                                            </Button>
                                        </Box>
                                    </form>
                                </CardContent>
                            </Card>
                        </Box>
                    </Container>
            }
        </Fragment>
    );
}

export default SignUP;