import React from 'react';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

//Icons
import MenuIcon from '@material-ui/icons/Menu';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const styles = {
    icon: {
        color: '#fff',
    }
};

const UserDrawer = ({ classes }) => {

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

export default withStyles(styles)(React.memo(UserDrawer));
