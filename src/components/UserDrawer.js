import React from 'react';
import { Link, useLocation } from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvater from '@material-ui/core/ListItemAvatar';
import Avater from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LandscapeIcon from '@material-ui/icons/Landscape';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

//Icons
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonIcon from '@material-ui/icons/Person';

//Redux
import { connect } from 'react-redux';

const styles = {
    icon: {
        color: '#fff',
    }
};

const mapStateToProps = state => ({
    credentials: state.user.credentials,
});
const UserDrawer = ({ classes, credentials }) => {

    const [open, setOpen] = React.useState(false);
    const location = useLocation();

    const toggleDrawer = (boolean) => {
        setOpen(boolean);
    }

    return (
        <>
            <IconButton
            onClick={() => toggleDrawer(true)}
            >
                <MenuIcon className={classes.icon}/>
            </IconButton>
            <SwipeableDrawer
            anchor="left"
            open={open}
            onOpen={() => toggleDrawer(true)}
            onClose={() => toggleDrawer(false)}
            >
                <List>
                    <ListItem alignItems="flex-start" button component={Link} to="/user" onClick={() => toggleDrawer(false)}>
                        <ListItemAvater
                        >
                            <Avater alt={credentials.name} src={credentials.image_url}/>
                        </ListItemAvater>
                        <ListItemText
                        primary={credentials.name}
                        secondary={
                            <>
                            <Typography
                            variant="body1"
                            color="primary"
                            >{credentials.phone_number}</Typography>
                            </>
                        }
                        >
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="/home" onClick={() => toggleDrawer(false)}>
                        <ListItemIcon
                        >
                            <HomeIcon color={location.pathname === "/home" ? "primary" : ""}/>
                        </ListItemIcon>
                        <ListItemText
                        primary="Home"
                        >
                        </ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/departments" onClick={() => toggleDrawer(false)}>
                        <ListItemIcon
                        >
                            <AccountBalanceIcon color={location.pathname === "/departments" ? "primary" : ""}/>
                        </ListItemIcon>
                        <ListItemText
                        primary="Departments"
                        >
                        </ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/territories" onClick={() => toggleDrawer(false)}>
                        <ListItemIcon
                        >
                            <LandscapeIcon color={location.pathname === "/territories" ? "primary" : ""}/>
                        </ListItemIcon>
                        <ListItemText
                        primary="Territories"
                        >
                        </ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/products" onClick={() => toggleDrawer(false)}>
                        <ListItemIcon
                        >
                            <ShoppingCartIcon color={location.pathname === "/products" ? "primary" : ""}/>
                        </ListItemIcon>
                        <ListItemText
                        primary="Products"
                        >
                        </ListItemText>
                    </ListItem>

                    <ListItem button component={Link} to="/customers" onClick={() => toggleDrawer(false)}>
                        <ListItemIcon
                        >
                            <AssignmentIndIcon color={location.pathname === "/customers" ? "primary" : ""}/>
                        </ListItemIcon>
                        <ListItemText
                        primary="Customers"
                        >
                        </ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/supervisors" onClick={() => toggleDrawer(false)}>
                        <ListItemIcon
                        >
                            <SupervisorAccountIcon color={location.pathname === "/supervisors" ? "primary" : ""}/>
                        </ListItemIcon>
                        <ListItemText
                        primary="Supervisors"
                        >
                        </ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/agents" onClick={() => toggleDrawer(false)}>
                        <ListItemIcon
                        >
                            <PersonIcon color={location.pathname === "/agents" ? "primary" : ""}/>
                        </ListItemIcon>
                        <ListItemText
                        primary="Agents"
                        >
                        </ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </>
    )
}

export default connect(
    mapStateToProps,
)(withStyles(styles)(React.memo(UserDrawer)));
