import React from 'react';
import {Link} from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip'

//redux
import { connect } from 'react-redux';

const styles = theme => ({
    name: {
        color: '#fff',
    }
});

const mapStateToProps = state => ({
    credentials: state.user.credentials,
})

const ProfileShortcut = ({classes, credentials}) => {
    return (
        <>
        <Tooltip
        title={credentials.name}
        component={Link}
        to="/user"
        >
        <Avatar src={credentials.image_url} />
        </Tooltip>
        </>
    )
}

export default connect(
    mapStateToProps,
)(withStyles(styles)(React.memo(ProfileShortcut)));