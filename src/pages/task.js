import React from 'react';
import TaskDetails from '../components/TaskDetails';
import TaskSwipeableView from '../components/TaskSwipeableView';

//MUI
import Grid from '@material-ui/core/Grid';

const Task = () => {
    return (
        <>
            <Grid container>
                <Grid item sm={12}>
                    <TaskDetails />
                    <TaskSwipeableView />
                </Grid>
            </Grid>
        </>
    );
}

export default React.memo(Task);