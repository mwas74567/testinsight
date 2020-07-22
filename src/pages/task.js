import React from 'react';
import TaskDetails from '../components/TaskDetails';
import Actions from '../components/Actions';

//MUI
import Grid from '@material-ui/core/Grid';

const Task = () => {
    return (
        <>
            <Grid container>
                <Grid item sm={12}>
                    <TaskDetails />
                    <Actions />
                </Grid>
            </Grid>
        </>
    );
}

export default React.memo(Task);