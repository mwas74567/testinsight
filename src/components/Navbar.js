import React from 'react';
import AddAgentDialog from './dialogs/AddAgentDialog';

//MUI
import ProfileShortcut from './ProfileShortcut';
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
import Typography from '@material-ui/core/Typography';

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
        titleContainer: {
            position: 'absolute',
            left: '10%',
            [theme.breakpoints.down('md')]: {
                left: '20%'
            }
        },
        profileShortcut: {
            position: 'absolute',
            right: '10%',
            [theme.breakpoints.down('md')]: {
                display: 'none',
            }
        }
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
        <div className={classes.profileShortcut}>
            <ProfileShortcut />
        </div>
        {
            location.pathname === "/agents" &&
            <div className={classes.functionContainer}>
                <AddAgentDialog/>
            </div>
        }
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
        {/**title routes */}
        {
            location.pathname.startsWith("/home") &&
            <div className={classes.titleContainer}>
                <Typography variant="h5">Home</Typography>
            </div>
        }
        {
            location.pathname.startsWith("/territories") &&
            <div className={classes.titleContainer}>
                <Typography variant="h5">Territories</Typography>
            </div>
        }
        {
            location.pathname.startsWith("/departments") &&
            <div className={classes.titleContainer}>
                <Typography variant="h5">Departments</Typography>
            </div>
        }
        {
            location.pathname.startsWith("/supervisors") &&
            <div className={classes.titleContainer}>
                <Typography variant="h5">Supervisors</Typography>
            </div>
        }
        {
            location.pathname.startsWith("/agents") &&
            <div className={classes.titleContainer}>
                <Typography variant="h5">Agents</Typography>
            </div>
        }
        {
            location.pathname.startsWith("/products") &&
            <div className={classes.titleContainer}>
                <Typography variant="h5">Products</Typography>
            </div>
        }
        {
            location.pathname.startsWith("/customers") &&
            <div className={classes.titleContainer}>
                <Typography variant="h5">Customers</Typography>
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