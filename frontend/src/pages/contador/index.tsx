import React, { useState, useEffect, } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Minimize';
import RestoreIcon from '@material-ui/icons//Restore';
import Typography from '@material-ui/core/Typography';

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
        textCenter: {
            textAlign: 'center'
        },
        alignIconRight: {
            marginLeft: 'auto'
        },
        cardWidth: {
            width: '100%'
        },
        marginContainer: {
            marginBottom: 20
        },
    }),
);

const Contador: React.FC = (props: any) => {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    useEffect(() => {
        document.title = props.title;
    });
    return (
        <Container maxWidth="md" className={classes.marginContainer}>
            <h1>{props.title}</h1>
            <Box width={1} display="flex" alignItems="center" justifyContent="center">
                <Card className={classes.cardWidth}>
                    <CardHeader title="CONTADOR" className={classes.textCenter} />
                    <CardContent>
                        <Typography variant="h3" gutterBottom>
                            <p className={classes.textCenter}>Count: <br /> {count}</p>
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton 
                            aria-label="add count" 
                            color="primary" 
                            onClick={() => 
                            setCount(count + 1)}
                        >
                            <AddIcon />
                        </IconButton>
                        <IconButton 
                            className={classes.alignIconRight} 
                            color="secondary" 
                            aria-label="minimizeIcon count" 
                            onClick={() => setCount(count - 1)}
                        >
                            <MinimizeIcon />
                        </IconButton>
                        <IconButton 
                            className={classes.alignIconRight} 
                            aria-label="reset count" 
                            onClick={() => setCount(0)}
                        >
                            <RestoreIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    );
}

export default Contador;