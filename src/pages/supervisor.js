import React from 'react';
import SupervisorProfile from '../components/Supervisor';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';


const styles = {

}

const Supervisor = ({ classes, loading, match, supervisors, getSupervisors, setSupervisor }) => {


    React.useEffect(() => {
        document.title = 'Client | Supervisor';
    }, [supervisors]);

    const component = <SupervisorProfile />;
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


export default withStyles(styles)(React.memo(Supervisor));
