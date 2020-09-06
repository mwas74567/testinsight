import React from 'react';
import dayjs from 'dayjs';
import SupervisorSummaryTables from '../SupervisorSummaryTables';
// import SupervisorSummaryDetails from '../SupervisorSummaryDetails';


//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//Icons
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CloseIcon from '@material-ui/icons/Close';

//redux
import { connect } from 'react-redux';
import { getSupervisorAnalytics, getSupervisorAgents } from '../../redux';
import Supervisor from '../Supervisor';

const styles = theme => ({
    xRight: {
        position: 'absolute',
        right: '5%',
    },
    detailsContainer: {
        marginBottom: 10,
        padding: 5,
    },
    background: {
        backgroundColor: 'rgb(245, 245, 245)',
    }
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade timeout={2000} ref={ref} {...props} />;
});

const mapStateToProps = state => ({
    loading: state.supervisorsData.loading,
});

const mapDispatchToProps = dispatch => ({
    getSupervisorAnalytics: supervisorId => dispatch(getSupervisorAnalytics(supervisorId)),
    getSupervisorAgents: agentId => dispatch(getSupervisorAgents(agentId)),
});

const SupervisorSummaryDialog = ({ classes, open, handleClose, getSupervisorAnalytics, getSupervisorAgents, loading, supervisor }) => {

    const fetchsupervisors = () => {
        getSupervisorAnalytics(supervisor.document_id);
        getSupervisorAgents(supervisor.document_id);
    }

    return (
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        onEntered={fetchsupervisors}
        TransitionComponent={Transition}
        PaperProps={{
            classes: {
                root: classes.background,
            }
        }}
        >
            <AppBar>
                <Toolbar>
                    <IconButton onClick={handleClose}>
                        <KeyboardBackspaceIcon style={{color: '#fff'}}/>
                    </IconButton>
                    <Typography variant="h6">Supervisor Details</Typography>
                    <div className={classes.xRight}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon style={{color: '#fff'}}/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <div className="container">
                <Supervisor
                supervisor={supervisor}
                handleClose={handleClose}
                />
                <SupervisorSummaryTables
                // document_id={supervisor.document_id}
                />
            </div>
        </Dialog>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(SupervisorSummaryDialog)));
