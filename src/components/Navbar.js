import React from 'react';
import SigninDialog from './dialogs/SigninDialog';
import UserMenu from './UserMenu';
import UserDrawer from './UserDrawer';
import { useLocation } from 'react-router-dom';
import AddDepartmentDialog from './dialogs/AddDepartmentDialog';
import AddSupervisorDialog from './dialogs/AddSupervisorDialog';
import AddTerritoryDialog from './dialogs/AddTerritoryDialog';
import AddCustomerDialog from './dialogs/AddCustomerDialog';
import useWidth from './hooks/useWidth';
import MiniVariantDrawer from './MiniVariantDrawer';

//MUI
import useTheme from '@material-ui/core/styles/useTheme';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';

//Redux
import { connect } from 'react-redux';

const drawerWidth = 240;

const styles = theme => (
    {
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
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    }
)

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
});
const Navbar = props => {
    const { classes, authenticated } = props;
    const location = useLocation();
    const width = useWidth();

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();


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
            location.pathname === "/departments" &&
            <div className={classes.functionContainer}>
                <AddDepartmentDialog/>
            </div>
        }
        {
            location.pathname === "/supervisors" &&
            <div className={classes.functionContainer}>
                <AddSupervisorDialog/>
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