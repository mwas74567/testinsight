import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

//MUI
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

//Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PersonIcon from '@material-ui/icons/Person';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 0,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const MiniVariantDrawer = ({theme, open, handleDrawerOpen, handleDrawerClose}) => {
  const classes = useStyles();

  return (
    <>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={open ? () => handleDrawerClose(): () => handleDrawerOpen()}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button component={Link} to="/home">
            <ListItemIcon
            >
                <HomeIcon color="primary"/>
            </ListItemIcon>
            <ListItemText
            primary="Home"
            >
            </ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/departments">
            <ListItemIcon
            >
                <AccountBalanceIcon color="primary"/>
            </ListItemIcon>
            <ListItemText
            primary="Departments"
            >
            </ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/supervisors">
            <ListItemIcon
            >
                <SupervisorAccountIcon color="primary"/>
            </ListItemIcon>
            <ListItemText
            primary="Supervisors"
            >
            </ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/agents">
            <ListItemIcon
            >
                <PersonIcon color="primary"/>
            </ListItemIcon>
            <ListItemText
            primary="Agents"
            >
            </ListItemText>
            </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default React.memo(MiniVariantDrawer);