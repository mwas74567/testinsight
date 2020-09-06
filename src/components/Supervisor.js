import React from 'react';
import { useCountUp } from 'react-countup';
import { Link } from 'react-router-dom';
import EditSupervisorDepartmentDialog from './dialogs/EditSupervisorDepartmentDialog';
import SupervisorAgent from './SupervisorAgents';


//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

//Icons
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

//redux
import { connect } from 'react-redux';
import { changeSupervisorStatus } from '../redux';

const styles = theme => ({
  paper: {
    padding: 20,
    // position: 'fixed',
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      paddingLeft: '30%',
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 0,
      },
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: '#00bcd4',
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    margin: '20px 5px 0px 0px',
    '& a': {
      margin: '20px 10px'
    }
  },
  imageIcon: {
      backgroundColor: 'rgba(0,0,0,.8)',
  }
});

const mapStateToProps = state => ({
    supervisor: state.supervisorsData.supervisor,
});

const mapDispatchToProps = dispatch => ({
    changeSupervisorStatus: (supervisorId, statusInfo) => dispatch(changeSupervisorStatus(supervisorId, statusInfo))
});

const Supervisor = ({ classes, supervisor, changeSupervisorStatus }) => {

    const { countUp, start, pauseResume, reset, update } = useCountUp({
        end: 5, 
        duration: 5,
        startOnMount: true,
    });

    const [status, setStatus] = React.useState(supervisor.status ? supervisor.status: "active");

    const disableSupervisor = () => {
        changeSupervisorStatus(supervisor.document_id, { status: "expired"});
        setStatus("expired");
    }

    const activateSupervisor = () => {
        changeSupervisorStatus(supervisor.document_id, { status: "active"});
        setStatus("active");
    }

    return (
      <>
        <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img className="profile-image" src={supervisor.image_url} alt="profile"/>
                    </div>
                    <hr/>
                    <hr/>
                    <div className="profile-details">
                    <Typography
                    variant="h5"
                    color="primary"
                    placement="top"
                    >{supervisor.name}
                    </Typography>
                    <hr/>
                    <MailIcon color="primary" /> <span><strong>{supervisor.email}</strong></span>
                    <hr/>
                    <PhoneIcon color="primary" /> <span><strong>{supervisor.phone_number}</strong></span>
                    <hr/>
                    <EqualizerIcon color="primary"/> <span>Agents Registered <strong>{supervisor.number_of_created_agents}</strong></span>
                    <hr/>
                    <AccountBalanceIcon color="primary"/> <span>Department <strong>{supervisor.department_name}</strong>
                    <EditSupervisorDepartmentDialog
                    title="Change Department"
                    label="Change Department"
                    infoKey="department_id"
                    type="text"
                    /></span>
                    <hr/>
                    </div>
                </div>
                <Divider />
                <Button
                    color="primary"
                    variant="contained"
                    component={Link}
                    to="/supervisors"
                    className={classes.buttons}
                    >Back</Button>
                {
                    status === "active" ?
                    <Button
                    color="secondary"
                    variant="contained"
                    onClick={disableSupervisor}
                    className={classes.buttons}
                    >Disable</Button> :
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={activateSupervisor}
                    className={classes.buttons}
                    >Activate</Button>
                }
            </Paper>
        
         {/* <Grid container
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
         </Grid> */}
         </>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(Supervisor)));
