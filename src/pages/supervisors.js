import React from 'react';
import SupervisorsSkeleton from '../components/skeletons/SupervisorsSkeleton';
import SupervisorsData from '../components/Supervisors';

//MUI
import Grid from '@material-ui/core/Grid';

//Redux
import { connect } from 'react-redux';
import { getSupervisors, } from '../redux';

const mapStateToProps = state => ({
    supervisors: state.supervisorsData.supervisors,
    loading: state.UI.loading,
});

const mapDispatchToProps = dispatch => ({
    getSupervisors: () => dispatch(getSupervisors()),
})

const Supervisors = ({ loading, supervisors, getSupervisors, }) => {

    React.useEffect(() => {
        document.title = 'Client | Supervisors';
        if(supervisors.length === 0) getSupervisors();
    }, []);

    const component = loading ? <SupervisorsSkeleton /> : <SupervisorsData />;

    return (
        <Grid container
        >
            <Grid item sm={12}>
            {component}
            </Grid>
        </Grid>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(React.memo(Supervisors));
