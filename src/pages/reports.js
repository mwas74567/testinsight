import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import VisitReportsContainer from '../components/VisitReportsContainer';
import CheckInSummariesContainer from '../components/CheckInSummariesContainer';

//MUI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

//Icons
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import BeenhereIcon from '@material-ui/icons/Beenhere';

//redux
import { connect } from 'react-redux';
import { getVisitReports, getCheckInSummaryReports } from '../redux';

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
  visitReports: state.data.visitReports,
  checkInSummaryReports: state.data.checkInSummaryReports,
});

const mapDispatchToProps = dispatch => ({
  getVisitReports: () => dispatch(getVisitReports()),
  getCheckInSummaryReports: () => dispatch(getCheckInSummaryReports()),
});

const Reports = ({ visitReports, getVisitReports, checkInSummaryReports, getCheckInSummaryReports }) => {

  React.useEffect(() => {
    document.title = "Client | Reports";
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if(value === 0 && visitReports.length === 0) getVisitReports();
    if(value === 1 && checkInSummaryReports.length === 0) getCheckInSummaryReports();
  }, [value]);

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
            <Tab label="Visit Reports" {...a11yProps(0)} icon={<DirectionsBikeIcon />} />
            <Tab label="Check In Summary" {...a11yProps(1)} icon={<BeenhereIcon />}/>
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            <TabPanel value={value} index={0} dir={theme.direction}>
            <VisitReportsContainer />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
            <CheckInSummariesContainer />
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
)(React.memo(Reports));