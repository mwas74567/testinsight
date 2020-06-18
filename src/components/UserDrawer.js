import React from 'react';
import { Link } from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvater from '@material-ui/core/ListItemAvatar';
import Avater from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

//Icons
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

//Redux
import { connect } from 'react-redux';

const styles = {
    icon: {
        color: '#fff',
    }
};

const mapStateToProps = state => ({
    credentials: state.user.credentials,
});
const UserDrawer = ({ classes, credentials }) => {

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (boolean) => {
        setOpen(boolean);
    }

    const topListMembers = ['First Item', 'Second Item', 'Third Item'];
    const bottomListMembers = ['Fourth Item', 'Fifth Item', 'Sixth Item'];
    return (
        <>
            <IconButton
            onClick={() => toggleDrawer(true)}
            >
                <MenuIcon className={classes.icon}/>
            </IconButton>
            <SwipeableDrawer
            anchor="left"
            open={open}
            onOpen={() => toggleDrawer(true)}
            onClose={() => toggleDrawer(false)}
            >
                <List>
                    {
                    topListMembers.map((text, index) => {
                        if(index === 0){
                            return (
                                <>
                                <ListItem key={text} alignItems="flex-start" button component={Link} to="/user" onClick={() => toggleDrawer(false)}>
                                    <ListItemAvater
                                    >
                                        <Avater alt={credentials.name} src={credentials.image_url}/>
                                    </ListItemAvater>
                                    <ListItemText
                                    primary={credentials.name}
                                    secondary={
                                        <>
                                        <Typography
                                        variant="body1"
                                        >{credentials.phone_number}</Typography>
                                        </>
                                    }
                                    >
                                    </ListItemText>
                                </ListItem>
                                <Divider/>
                                </>
                            )
                        }
                        if(index === 1){
                            return (
                                <>
                                <ListItem key={text} button component={Link} to="/home" onClick={() => toggleDrawer(false)}>
                                    <ListItemIcon
                                    >
                                        <HomeIcon/>
                                    </ListItemIcon>
                                    <ListItemText
                                    primary="Home"
                                    >
                                    </ListItemText>
                                </ListItem>
                                </>
                            )
                        }
                        
                        return(
                            <ListItem button key={text} onClick={() => toggleDrawer(false)}>
                                <ListItemIcon><AccessTimeIcon /></ListItemIcon>
                                <ListItemText>{text}</ListItemText>
                            </ListItem>
                        )
                    })
                    }
                    <Divider />
                    {
                    bottomListMembers.map((text, index) => {
                        return(
                            <ListItem button key={text} onClick={() => toggleDrawer(false)}>
                                <ListItemIcon><AccessTimeIcon /></ListItemIcon>
                                <ListItemText>{text}</ListItemText>
                            </ListItem>
                        )
                    })
                    }
                </List>
            </SwipeableDrawer>
        </>
    )
}

export default connect(
    mapStateToProps,
)(withStyles(styles)(React.memo(UserDrawer)));
