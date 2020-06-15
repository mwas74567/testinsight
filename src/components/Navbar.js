import React from 'react';

//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    toolbar: {
        margin: 'auto',
    }
}
const Navbar = props => {
    const { classes } = props;
    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(React.memo(Navbar));