import React from 'react';
import { Link } from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

//Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';

//Redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux';

const styles = {
    icon: {
        color: '#fff'
    }
}

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
})

const UserMenu = ({ classes, logoutUser }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    //callbacks
    const handleOpen = event => {
        setAnchorEl(event.target)
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <IconButton onClick={handleOpen}  aria-owns={anchorEl ? 'simple-menu' : undefined } aria-haspopup="true">
                <MoreVertIcon className={classes.icon}/>
            </IconButton>
            <Menu
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}
            >
                <MenuItem onClick={handleClose} component={Link} to="/user">
                    <Typography
                    variant="body1"
                    >Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => logoutUser()}>
                    <Typography
                    variant="body1"
                    >Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default connect(
    null,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(UserMenu)));
