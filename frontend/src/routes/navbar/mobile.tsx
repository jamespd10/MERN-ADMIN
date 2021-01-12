import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
//Styles
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
//Componens
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ContadorIcon from '@material-ui/icons/ExposurePlus1Outlined';
import LoginIcon from '@material-ui/icons/AccountBox';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme: Theme) => createStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Mobile: React.FC = () => {
    const classes = useStyles();
    const [isOpen, setOpenState] = useState(false);

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setOpenState(open);
    };

    return (
        <Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"
                        className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        React App
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <ListItem button>
                            <ListItemText primary="Menú" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button component={Link} to="/">
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button component={Link} to="/contador">
                            <ListItemIcon><ContadorIcon /></ListItemIcon>
                            <ListItemText primary="Contador" />
                        </ListItem>
                        <ListItem button component={Link} to="/signin">
                            <ListItemIcon><LoginIcon /></ListItemIcon>
                            <ListItemText primary="Ingresar" />
                        </ListItem>
                        <ListItem button component={Link} to="/signup">
                            <ListItemIcon><LoginIcon /></ListItemIcon>
                            <ListItemText primary="Registrar" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </Fragment>
    );
}

export default Mobile;