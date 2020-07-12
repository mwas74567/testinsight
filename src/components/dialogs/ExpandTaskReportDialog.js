import React from 'react';
import dayjs from 'dayjs';
import ActionReportsSkeleton from '../skeletons/ActionReportsSkeleton';
import ActionReports from '../ActionReports';
import TaskReportDetails from '../TaskReportDetails';


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
import { getActionReports } from '../../redux';

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
    loading: state.data._loading,
});

const mapDispatchToProps = dispatch => ({
    getActionReports: taskReportId => dispatch(getActionReports(taskReportId)),
});

const ExpandTaskReportDialog = ({ classes, open, handleClose, getActionReports, loading, report }) => {

    const fetchActionReports = () => {
        getActionReports(report.document_id);
    }

    return (
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        onEntered={fetchActionReports}
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
                    <Typography variant="h6">Task Report Details</Typography>
                    <div className={classes.xRight}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon style={{color: '#fff'}}/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <div className="container">
                <TaskReportDetails
                report={report}
                handleClose={handleClose}
                />
                <Typography variant="h6" color="textSecondary"><i>Action Reports</i></Typography>
                { loading ? <ActionReportsSkeleton/> : <ActionReports />}
            </div>
        </Dialog>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(ExpandTaskReportDialog)));
