import React, { useEffect, useState, Fragment, useContext } from 'react';
import { useForm } from "react-hook-form";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ErrorAlert, SuccessAlert } from '../../messages/';
import api from '../../api';
import { UserContext } from '../../constants';

type Inputs = {
    usuario: string,
    password: string,
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
        marginContainer: {
            marginBottom: 20
        },
    }),
);

const SignIN: React.FC = (props: any) => {
    useEffect(() => {
        document.title = props.title;
    });
    const userData = useContext(UserContext);
    const [isSubmit, setSubmit] = useState(false);
    const classes = useStyles();
    const { register, handleSubmit, errors, watch, reset } = useForm<Inputs>({ mode: 'all' });
    const watchUsuario = watch("usuario");
    const watchPassword = watch("password");
    const onSubmit = async (data: Inputs) => {
        setSubmit(true);
        reset();
        await api.post('/usuarios/signin', {
            usuario: data.usuario,
            password: data.password,
        })
            .then(function (response) {
                setSubmit(false);
                userData.setUserData(response.data);
                SuccessAlert("Inicio satisfactorio!");
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
            <Container maxWidth="md" className={classes.marginContainer}>
                <h1>{props.title}</h1>
                <Box width={1} display="flex" alignItems="center" justifyContent="center">
                    <Card>
                        <CardHeader title="FORMULARIO DE INGRESO" style={{ textAlign: 'center' }} />
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
                                <div>
                                    <TextField
                                        label="Usuario"
                                        variant="outlined"
                                        type="text"
                                        name="usuario"
                                        id="usuario"
                                        inputRef={register({
                                            required: "el usuario es requerido",
                                        })}
                                        error={errors.usuario ? true : false}
                                        helperText={errors.usuario ? errors.usuario.message : null}
                                        fullWidth
                                    />
                                    {watchUsuario}
                                </div>
                                <div>
                                    <TextField
                                        label="Contraseña"
                                        variant="outlined"
                                        type="password"
                                        name="password"
                                        id="password"
                                        inputRef={register({
                                            required: "la contraseña es requerida",
                                        })}
                                        error={errors.password ? true : false}
                                        helperText={errors.password ? errors.password.message : null}
                                        fullWidth
                                    />
                                    {watchPassword}
                                </div>
                                <Box width={1} display="flex" alignItems="center" justifyContent="center">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        type="submit"
                                        endIcon={<SendIcon />}
                                        disabled={isSubmit ? true : false}
                                    >
                                        {isSubmit ? <CircularProgress size={24} /> : ''} INGRESAR
                                    </Button>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </Fragment>
    );
}

export default SignIN;