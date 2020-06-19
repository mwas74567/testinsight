import React from 'react';
import { useCountUp } from 'react-countup';
import EditEntity from './EditEntity';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

//Icons
import EditIcon from '@material-ui/icons/Edit';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import Timeline from '@material-ui/icons/Timeline';

//redux
import { connect } from 'react-redux';
import { uploadImage } from '../redux';

const styles = {
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
        textAlign: 'center',
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
    }
  }

const mapStateToProps = state => ({
    credentials: state.user.credentials,
});

const mapDispatchToProps = dispatch => ({
    uploadImage: formData => dispatch(uploadImage(formData)),
});

const Profile = ({ classes, credentials, uploadImage }) => {

    dayjs.extend(relativeTime);

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
                    <DirectionsWalk color="primary" /><span>{'  '}Minimum Check-ins Radius <strong>{credentials.minimum_check_ins_radius}</strong></span>
                    <EditEntity
                        title="Update Check-ins Radius"
                        label="Check-ins"
                        infoKey="minimum_check_ins_radius"
                        type="number"
                    />
                    <hr/>
                    <Timeline color="primary" /><span>{'  '}Mininum Check-ins Interval <strong>{credentials.minimum_check_ins_interval}</strong></span>
                    <EditEntity
                        title="Update Check-ins Interval"
                        label="Interval"
                        infoKey="minimum_check_ins_interval"
                        type="number"
                    />
                    </div>
                </div>
            </Paper>
        </>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(Profile)));
