import React from 'react';
import AgentProfile from '../components/Agent';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';


const styles = {

}

const Agent = ({ classes, }) => {

    const component = <AgentProfile />;
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


export default withStyles(styles)(React.memo(Agent));
