import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AnalyticsSkeleton from './skeletons/AnalyticsSkeleton';
// import SupervisorAnalytics from './SupervisorAnalytics';
import AgentsSkeleton from './skeletons/AgentsSkeleton';
import Agents from './Agents';

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
import { getSupervisorAnalytics, getSupervisorAgents } from '../redux';

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
  loading: state.supervisorAgentsData.loading,
  supervisorAnalytics: state.supervisorAnalyticsData.supervisor_analytics,
  supervisorAgents: state.supervisorAgentsData.agents,
});

const mapDispatchToProps = dispatch => ({
    getSupervisorAnalytics: supervisorId => dispatch(getSupervisorAnalytics(supervisorId)),
    getSupervisorAgents: agentId => dispatch(getSupervisorAgents(agentId)),
});

const SupervisorSummaryTables = ({ loading, getSupervisorAnalytics, getSupervisorAgents, document_id, supervisorAgents, supervisorAnalytics }) => {

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if(value === 0) getSupervisorAgents(document_id);
    if(value === 1) getSupervisorAnalytics(document_id);
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
            <Tab label="Analytics" {...a11yProps(0)} icon={<BeenhereIcon />} />
            <Tab label="Agents" {...a11yProps(1)} icon={<AssignmentLateIcon />}/>
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            <TabPanel value={value} index={0} dir={theme.direction}>
            {loading ? <supervisorAgentsSkeleton /> : <supervisorAgents />}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
            {loading ? <supervisorAnalyticsSkeleton /> : <supervisorAnalytics/>}
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
)(React.memo(SupervisorSummaryTables));