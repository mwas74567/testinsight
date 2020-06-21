import React from 'react';
import SupervisorsSkeleton from '../components/skeletons/SupervisorsSkeleton';
import SupervisorsData from '../components/Supervisors';

//MUI
import Grid from '@material-ui/core/Grid';

//Redux
import { connect } from 'react-redux';
import { getSupervisors, getDepartments } from '../redux';

const mapStateToProps = state => ({
    supervisors: state.data.supervisors,
    departments: state.data.departments,
    loading: state.UI.loading,
});

const mapDispatchToProps = dispatch => ({
    getSupervisors: () => dispatch(getSupervisors()),
    getDepartments: () => dispatch(getDepartments()),
})

const Supervisors = ({ loading, supervisors, departments, getSupervisors, getDepartments}) => {

    React.useEffect(() => {
        document.title = 'Client | Supervisors';
        if(supervisors.length === 0) getSupervisors();
        if(departments.length === 0) getDepartments();
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
