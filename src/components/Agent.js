import React from 'react';
import { useCountUp } from 'react-countup';
import {Link} from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//Icons
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';

//redux
import { connect } from 'react-redux';
import { changeAgentStatus } from '../redux';

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
    agent: state.agentsData.agent,
});

const mapDispatchToProps = dispatch => ({
    changeAgentStatus: (agentId, statusInfo) => dispatch(changeAgentStatus(agentId, statusInfo))
});

const Agent = ({ classes, agent, changeAgentStatus }) => {

    const { countUp, start, pauseResume, reset, update } = useCountUp({
        end: 5, 
        duration: 5,
        startOnMount: true,
    });

    const [status, setStatus] = React.useState(agent.status ? agent.status: "active");

    const disableAgent = () => {
        changeAgentStatus(agent.document_id, { status: "expired"});
        setStatus("expired");
    }

    const activateAgent = () => {
        changeAgentStatus(agent.document_id, { status: "active"});
        setStatus("active");
    }

    return (
        <>
        <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img className="profile-image" src={agent.image_url} alt="profile"/>
                    </div>
                    <hr/>
                    <hr/>
                    <div className="profile-details">
                    <Typography
                    variant="h5"
                    color="primary"
                    placement="top"
                    >{agent.name}
                    </Typography>
                    <hr/>
                    <MailIcon color="primary" /> <span>{agent.email}</span>
                    <hr/>
                    <PhoneIcon color="primary" /> <span>{agent.phone_number}</span>
                    <hr/>
                    <LooksTwoIcon color="primary"/> <span>Type <strong>{agent.agent_type}</strong></span>
                    <hr/>
                    </div>
                </div>
                <Divider />
                <Button
                    color="primary"
                    variant="contained"
                    component={Link}
                    to="/agents"
                    className={classes.buttons}
                    >Back</Button>
                {
                    status === "active" ?
                    <Button
                    color="secondary"
                    variant="contained"
                    onClick={disableAgent}
                    className={classes.buttons}
                    >Disable</Button> :
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={activateAgent}
                    className={classes.buttons}
                    >Activate</Button>
                }
            </Paper>
        </>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(Agent)));
