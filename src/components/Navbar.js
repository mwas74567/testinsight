import React from 'react';
import SigninDialog from './dialogs/SigninDialog';
import UserMenu from './UserMenu';
import UserDrawer from './UserDrawer';
import { useLocation } from 'react-router-dom';
import AddAgentDialog from './dialogs/AddAgentDialog';
import AddTerritoryDialog from './dialogs/AddTerritoryDialog';
import useWidth from './hooks/useWidth';
import MiniVariantDrawer from './MiniVariantDrawer';
import AddCustomerDialog from './dialogs/AddCustomerDialog';
import AddTaskDialog from './dialogs/AddTaskDialog';


//dialogs

//MUI
import useTheme from '@material-ui/core/styles/useTheme';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';

//Redux
import { connect } from 'react-redux';

const styles = {
    toolbar: {
        
    },
    actionContainer: {
        position: 'absolute',
        right: '5%',
    },
    functionContainer: {
        position: 'absolute',
        right: '50%',
    },
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
});
const Navbar = props => {
    const width = useWidth();
    const { classes, authenticated } = props;
    const location = useLocation();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const drawer = (width === "lg" || width === "xl") ? (
        <MiniVariantDrawer
        theme={theme}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        />
    ) : (
        <UserDrawer />
    );

    const navMarkup = authenticated ? (
        <>
        {drawer}
        {
            location.pathname === "/agents" &&
            <div className={classes.functionContainer}>
                <AddAgentDialog/>
            </div>
        }
        {
            location.pathname === "/territories" &&
            <div className={classes.functionContainer}>
                <AddTerritoryDialog/>
            </div>
        }
        {
            location.pathname === "/customers" &&
            <div className={classes.functionContainer}>
                <AddCustomerDialog/>
            </div>
        }
        {
            location.pathname === "/tasks" &&
            <div className={classes.functionContainer}>
                <AddTaskDialog/>
            </div>
        }
        <div className={classes.actionContainer}>
            <UserMenu />   
        </div>
        </>
    ) : (
        <>
        <div className={classes.actionContainer}>
            <SigninDialog />   
        </div>
        </>
    );
    
    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                {navMarkup}
            </Toolbar>
        </AppBar>
    )
}

export default connect(
    mapStateToProps
)(withStyles(styles)(React.memo(Navbar)));