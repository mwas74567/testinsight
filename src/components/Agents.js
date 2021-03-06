import React from 'react';
import { Link } from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


//Icons
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

//Redux
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    agents: state.data.agents
})

const styles = theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    card: {
        minWidth: '40%',
        margin: 20,
        display: 'flex',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    image: {
        minWidth: 100,
    },
    separator: {
        border: 'none',
        margin: '0 0 10px 0',
    },
    content: {
        padding: 20,
    },
    see: {
        position: 'absolute',
        right: '10%',
        top: -5,
    }
})

const Agents = ({ classes, agents }) => {

    const markup = agents.map((agent, agentIndex) => {
        return (
            <Card className={classes.card}>
                <CardMedia image={agent.image_url} title="Profile" className={classes.image}/>
                <CardContent className={classes.content}>
                    <div className={classes.see}><span>
                        <Tooltip title="See Agent">
                            <IconButton component={Link} to={`/agents/${agent.document_id}`}>
                            <NavigateNextIcon color="error"/>
                            </IconButton>
                        </Tooltip>
                    </span></div>
                    <div className={classes.item}><span><MailIcon color="primary"/> {agent.email}</span></div>
                    <hr className={classes.separator}/>
                    <div className={classes.item}><span><PhoneIcon color="primary"/> {agent.phone_number}</span></div>
                </CardContent>
            </Card>  
        )
    })
    return (
        <div className={classes.wrapper}>
            {markup}
        </div>
    )
}

export default connect(
    mapStateToProps,
)(withStyles(styles)(React.memo(Agents)));
