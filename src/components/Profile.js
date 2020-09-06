import React from 'react';
import { useCountUp } from 'react-countup';
import EditEntity from './dialogs/EditEntity';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';

//Icons
import EditIcon from '@material-ui/icons/Edit';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import Timeline from '@material-ui/icons/Timeline';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';

//redux
import { connect } from 'react-redux';
import { uploadImage } from '../redux';

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
    '& a': {
      margin: '20px 10px'
    }
  },
  imageIcon: {
      backgroundColor: 'rgba(0,0,0,.8)',
  },
  actionButtons: {
    margin: '5px 5px 5px 0px',
  },
  distance:{
    cursor:'pointer',
    
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const mapStateToProps = state => ({
    credentials: state.user.credentials,

});

const mapDispatchToProps = dispatch => ({
    uploadImage: formData => dispatch(uploadImage(formData)),
});


const Profile = ({ classes, credentials, uploadImage }) => {

    dayjs.extend(relativeTime);
    
    const [distance, setDistance,] = React.useState(credentials.minimum_check_ins_radius);
    const [minutes, setTime,] = React.useState(credentials.minimum_check_ins_interval);

    const { countUp, start, pauseResume, reset, update } = useCountUp({
        end: 5, 
        duration: 5,
        startOnMount: true,
    });

    const handleImageChange = event => {
        const imageFile = event.target.files[0];
        const formData = new FormData();
        formData.append('image', imageFile, imageFile.name);
        uploadImage(formData);
    }

    const selectImage = () => {
        const input = document.querySelector("#imageInput");
        input.click();
    }

    const handleChange = (event) => {
     
      setDistance(event.target.value)
 
      
    };
    
    const convertMinutes = (event) => {
     
      setTime(event.target.value)
 
      
    };

    return (
        <>
        <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img className="profile-image" src={credentials.image_url} alt="profile"/>
                        <input type="file" id="imageInput" onChange={event => handleImageChange(event)} hidden="hidden"/>
                        <Tooltip
                        title="Change Profile Image"
                        placement="top"
                        >
                            <IconButton
                            onClick={selectImage}
                            className={classes.imageIcon}
                            ><EditIcon color="primary"/></IconButton>
                        </Tooltip>
                    </div>
                    <hr/>
                    <hr/>
                    <div className="profile-details">
                    <Typography
                    variant="h5"
                    color="primary"
                    placement="top"
                    >{credentials.name}
                    <EditEntity
                        title="Change Name"
                        label="Name"
                        infoKey="name"
                        type="text"
                    />
                    </Typography>
                    <hr/>
                    <MailIcon color="primary" /> <span>{credentials.email}</span>
                    <hr/>
                    <PhoneIcon color="primary" /> <span>{credentials.phone_number}</span>
                    <EditEntity
                        title="Change Phone"
                        label="Phone"
                        infoKey="phone_number"
                        type="number"
                    />
                    <hr/> 
                       <DirectionsWalk color="primary" /><span>{'  '}Mininum Check-ins Radius <strong>{distance? (distance) : (credentials.minimum_check_ins_radius/1000)}<span className={classes.distance}></span></strong></span>
                       <FormControl className={classes.formControl}>
                         <InputLabel id="demo-simple-select-label"></InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                           value={distance}
                          onChange={handleChange}
                                    >
                          <MenuItem value={credentials.minimum_check_ins_radius}>Meters</MenuItem>
                          <MenuItem value={credentials.minimum_check_ins_radius/1000} >Kilometres</MenuItem>
                          </Select>
                         </FormControl>
                    <EditEntity
                        title="Update Check-ins Radius"
                        label="Check-ins"
                        infoKey="minimum_check_ins_radius"
                        type="number"
                    />
                    <hr/>
                    <Timeline color="primary" /><span>{'  '}Mininum Check-ins Interval <strong>{minutes ? (minutes):(credentials.minimum_check_ins_interval/60)}</strong></span>
                    <FormControl className={classes.formControl}>
                         <InputLabel id="demo-simple-select-label"></InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                           value={minutes}
                          onChange={convertMinutes}                                    >
                          <MenuItem value={credentials.minimum_check_ins_interval}>Minutes</MenuItem>
                          <MenuItem value={credentials.minimum_check_ins_interval/60} >Hours</MenuItem>
                          </Select>
                         </FormControl>
                    <EditEntity
                        title="Update Check-ins Interval"
                        label="Interval"
                        infoKey="minimum_check_ins_interval"
                        type="number"
                    />
                    <hr/>
                    <AccessAlarmIcon color="primary" /> <span>Status :<strong>{credentials.status}</strong></span>
                    <hr/><hr/>
                    {/* <EventAvailableIcon color="primary"/> <span>Last Billing Date<strong>{credentials.last_billing_date}</strong></span>
                    <EventBusyIcon color="primary"/> <span>Next Billing Date<strong>{credentials.next_billing_date}</strong></span> */}
                    <HourglassFullIcon color="primary"/> <span>Subscription Status :<strong>{credentials.subscription_status}</strong></span>
                    <hr/>
                    </div>
                </div>
                <Divider />
                <Button
                color="primary"
                variant="contained"
                component={Link}
                to="/home"
                className={classes.actionButtons}
                >Back</Button>
            </Paper>
        </>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(Profile)));
