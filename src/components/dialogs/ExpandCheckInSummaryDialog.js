import React from 'react';
import dayjs from 'dayjs';
import TaskReportsSkeleton from '../skeletons/TaskReportsSkeleton';
import TaskReports from '../TaskReports';
import CheckInReportsSkeleton from '../skeletons/CheckInReportsSkeleton';
import CheckInReports from '../CheckInReports';
import CheckInSummaryDetails from '../CheckInSummaryDetails';


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
import { getTaskReports,getCheckInReports } from '../../redux';

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
    loading: state.data.loading,
});

const mapDispatchToProps = dispatch => ({
    getTaskReports: scheduleId => dispatch(getTaskReports(scheduleId)),
    getCheckInReports: summaryId => dispatch(getCheckInReports(summaryId)),
});

const ExpandCheckInSummaryDialog = ({ classes, open, handleClose, getTaskReports, getCheckInReports, loading, report }) => {

    const fetchReports = () => {
        getTaskReports(report.document_id);
        getCheckInReports(report.document_id);
    }

    return (
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        onEntered={fetchReports}
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
                    <Typography variant="h6">Check In Details</Typography>
                    <div className={classes.xRight}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon style={{color: '#fff'}}/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <div className="container">
                <CheckInSummaryDetails
                report={report}
                handleClose={handleClose}
                />
                <Typography variant="h6" color="textSecondary"><i>Check Ins</i></Typography>
                {loading ? <CheckInReportsSkeleton /> : <CheckInReports />}
                <Typography variant="h6" color="textSecondary"><i>Task Reports</i></Typography>
                {loading ? <TaskReportsSkeleton /> : <TaskReports/>}
            </div>
        </Dialog>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(ExpandCheckInSummaryDialog)));
