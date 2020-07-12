import React from 'react';
import SchedulesSkeleton from '../components/skeletons/SchedulesSkeleton';
import SchedulesData from '../components/Schedules';

//MUI
import Grid from '@material-ui/core/Grid';

//redux
import { connect } from 'react-redux';
import { getSchedules } from '../redux';


const mapStateToProps = state => ({
    schedules: state.data.schedules,
    loading: state.UI.loading,
});

const mapDispatchToProps = dispatch => ({
    getSchedules: () => dispatch(getSchedules()),
});

const Schedules = ({ getSchedules, schedules, loading }) => {

    React.useEffect(() => {
        document.title = 'Client | Schedules';
        if(schedules.length === 0) getSchedules();
    }, []);

    const component = loading ? <SchedulesSkeleton />: <SchedulesData />;

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
)(React.memo(Schedules));
