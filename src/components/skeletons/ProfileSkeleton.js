import React from 'react';
import image from '../../images/no-image.png';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';


//Icons
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import Timeline from '@material-ui/icons/Timeline';

const styles = {
    paper: {
      padding: 20,
      // position: 'fixed',
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
      },
      '& .profile-image': {
        width: 300,
        height: 300,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle',
        },
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0',
      },
    },
  }

const ProfileSkeleton = ({ classes }) => {

    return (
        <>
        <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img className="profile-image" src={image} alt="profile"/>
                    </div>
                    <hr/>
                    <hr/>
                    <div className="profile-details">
                    <hr/>
                    <MailIcon color="primary" /> 
                    <hr/>
                    <PhoneIcon color="primary" />
                    <hr/>
                    <DirectionsWalk color="primary"/>
                    <hr/>
                    <Timeline color="primary"/>
                    <hr/>
                    </div>
                </div>
            </Paper>
        </>
    )
}

export default withStyles(styles)(React.memo(ProfileSkeleton));
