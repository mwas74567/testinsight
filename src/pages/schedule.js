import React from 'react';
import ScheduleData from '../components/Schedule';
import TasksInSchedule from '../components/TasksInSchedules';

//MUI
import Grid from '@material-ui/core/Grid';


const Schedule = () => {
  
    return (
        <>
            <Grid container>
                <Grid item sm={12}>
                <ScheduleData />
                <TasksInSchedule />
                </Grid>
            </Grid>
        </>
    );
}

export default React.memo(Schedule);