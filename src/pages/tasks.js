import React from 'react';
import TasksSkeleton from '../components/skeletons/TasksSkeleton';
import TasksData from '../components/Tasks';

//MUI
import Grid from '@material-ui/core/Grid';

//redux
import { connect } from 'react-redux';
import { getTasks } from '../redux';


const mapStateToProps = state => ({
    tasks: state.tasksData.tasks,
    loading: state.UI.loading,
});

const mapDispatchToProps = dispatch => ({
    getTasks: () => dispatch(getTasks()),
})

const Tasks = ({ getTasks, tasks, loading }) => {

    React.useEffect(() => {
        document.title = 'Client | Tasks';
        if(tasks.length === 0) getTasks();
    }, []);

    const component = loading ? <TasksSkeleton/> : <TasksData />

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
)(React.memo(Tasks));
