import React from 'react';
import SigninDialog from './SigninDialog';
import UserMenu from './UserMenu';

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
    }
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
});
const Navbar = props => {
    const { classes, authenticated } = props;
    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <div className={classes.actionContainer}>
                    {
                        authenticated ?
                        <UserMenu /> :
                        <SigninDialog />
                    }
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default connect(
    mapStateToProps
)(withStyles(styles)(React.memo(Navbar)));