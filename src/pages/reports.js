import React from 'react';
import ReportsSkeleton from '../components/skeletons/CustomersSkeleton';
import ReportsData from '../components/Reports';

//MUI
import Grid from '@material-ui/core/Grid';

//redux
import { connect } from 'react-redux';
import { getTasks } from '../redux';


const mapStateToProps = state => ({
    tasks: state.data.tasks,
    loading: state.UI.loading,
});

const mapDispatchToProps = dispatch => ({
    getTasks: () => dispatch(getTasks()),
})

const Reports = ({ getTasks, tasks, loading }) => {

    React.useEffect(() => {
        document.title = 'Supervisor | Customers';
        if(tasks.length === 0) getTasks();
    }, []);

    const component = loading ? <ReportsSkeleton /> : <ReportsData />;

    return (
        <Grid 
        container
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
)(React.memo(Reports));
