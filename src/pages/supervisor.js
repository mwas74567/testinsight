import React from 'react';
import SupervisorAgent from '../components/Supervisor';
import SupervisorAgentsSwipeableView from '../components/SupervisorAgentsSwipeable';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';


const styles = {

}

const Supervisor = ({ classes, loading, match, supervisors, getSupervisors, setSupervisor }) => {


    React.useEffect(() => {
        document.title = 'Client | Supervisor';
    }, [supervisors]);

    
    return (
        <>
        <Grid container>
            <Grid item sm={12}>
              <SupervisorAgent />
                <SupervisorAgentsSwipeableView />
            </Grid>
        </Grid>
    </>
    )
}


export default withStyles(styles)(React.memo(Supervisor));
