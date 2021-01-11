import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
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
    usuario: string,
    password: any,
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

const SignIN: React.FC = (props: any) => {
    useEffect(() => {
        document.title = props.title;
    });
    const classes = useStyles();
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
                    <Container maxWidth="md">
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
                                                type="text"
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
                                                endIcon={<DeleteIcon />}
                                            >
                                                INGRESAR
                                            </Button>
                                        </Box>
                                    </form>
                                </CardContent>
                            </Card>
                        </Box>
                    </Container>
            }
        </Fragment >
    );
}

export default SignIN;