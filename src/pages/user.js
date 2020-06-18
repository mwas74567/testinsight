import React from 'react';
import Profile from '../components/Profile';
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

//Redux
import { connect } from 'react-redux';

const styles = {

}

const mapStateToProps = state => ({
    loading: state.UI.loading
});

const User = ({ classes, loading }) => {

    React.useEffect(() => {
        document.title = 'Client | Me';
    }, []);

    const component = loading ? <ProfileSkeleton/> : <Profile/>;
    return (
        <>
            <Grid container>
                <Grid item sm={12}>
                {component}
                </Grid>
            </Grid>
        </>
    )
}


export default connect(
    mapStateToProps,
)(withStyles(styles)(React.memo(User)));
