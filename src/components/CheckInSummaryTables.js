import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import TaskReportsSkeleton from './skeletons/TaskReportsSkeleton';
import TaskReports from './TaskReports';
import CheckInReportsSkeleton from './skeletons/CheckInReportsSkeleton';
import CheckInReports from './CheckInReports';

//MUI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

//Icons
import BeenhereIcon from '@material-ui/icons/Beenhere';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';

//redux
import { connect } from 'react-redux';
import { getTaskReports, getCheckInReports } from '../redux';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    [theme.breakpoints.up('sm')]: {
        width: '100%',
    }
  },
}));

const mapStateToProps = state => ({
  loading: state.checkInReportsData.loading,
  taskReports: state.taskReportsData.task_reports,
  checkInReports: state.checkInReportsData.check_in_reports,
});

const mapDispatchToProps = dispatch => ({
    getTaskReports: scheduleId => dispatch(getTaskReports(scheduleId)),
    getCheckInReports: summaryId => dispatch(getCheckInReports(summaryId)),
});

const CheckInSummaryTables = ({ loading, getTaskReports, getCheckInReports, document_id, checkInReports, taskReports }) => {

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if(value === 0) getCheckInReports(document_id);
    if(value === 1) getTaskReports(document_id);
  }, [value, document_id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Grid container
    >
        <Grid item sm={12}>
        <div className={classes.root}>
        <AppBar position="static" color="default">
            <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs"
            >
            <Tab label="Check In Reports" {...a11yProps(0)} icon={<BeenhereIcon />} />
            <Tab label="Task Reports" {...a11yProps(1)} icon={<AssignmentLateIcon />}/>
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            <TabPanel value={value} index={0} dir={theme.direction}>
            {loading ? <CheckInReportsSkeleton /> : <CheckInReports />}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
            {loading ? <TaskReportsSkeleton /> : <TaskReports/>}
            </TabPanel>
        </SwipeableViews>
        </div>
        </Grid>
    </Grid>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(CheckInSummaryTables));