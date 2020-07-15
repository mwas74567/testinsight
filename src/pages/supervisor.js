import React from 'react';
import SupervisorProfile from '../components/Supervisor';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

//Redux
import { connect } from 'react-redux';
import { getSupervisors, setSupervisor } from '../redux';

const styles = {

}

const mapStateToProps = state => ({
    loading: state.UI.loading, 
    supervisors: state.supervisorsData.supervisors,
});

const mapDispatchToProps = dispatch => ({
    getSupervisors: () => dispatch(getSupervisors()),
    setSupervisor: supervisor => dispatch(setSupervisor(supervisor)),
});

const Supervisor = ({ classes, loading, match, supervisors, getSupervisors, setSupervisor }) => {

    const findSupervisor = () => {
        if(supervisors.length === 0) return {};
        let targetSupervisor;
        supervisors.forEach((supervisor, supervisorIndex) => {
            if(supervisor.document_id === match.params.supervisorId) targetSupervisor = supervisor;
        });

        return targetSupervisor;
    }

    React.useEffect(() => {
        document.title = 'Client | Supervisor';
        if(supervisors.length === 0) getSupervisors();
        setSupervisor(findSupervisor());
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


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(Supervisor)));
