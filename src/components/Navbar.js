import React from 'react';
import SigninDialog from './SigninDialog';
import UserMenu from './UserMenu';
import UserDrawer from './UserDrawer';
import { useLocation } from 'react-router-dom';
import AddDepartmentDialog from './AddDepartmentDialog';
import AddSupervisorDialog from './AddSupervisorDialog';

//MUI
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
    const { classes, authenticated } = props;
    const location = useLocation();

    const navMarkup = authenticated ? (
        <>
        <UserDrawer />
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