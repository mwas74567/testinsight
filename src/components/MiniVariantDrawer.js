import React from 'react';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

//MUI
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

//Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LandscapeIcon from '@material-ui/icons/Landscape';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ReportIcon from '@material-ui/icons/Report';


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
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    position: 'absolute',
    bottom: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const MiniVariantDrawer = ({theme, open, handleDrawerOpen, handleDrawerClose}) => {
  const classes = useStyles();
  const location = useLocation();

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
          
        </div>
        <Divider />
        <List>
            <Tooltip
            disableHoverListener={open}
            placement="right"
            title="Home"
            >
            <ListItem button component={Link} to="/home">
            <ListItemIcon
            >
                <HomeIcon color={location.pathname.startsWith("/home") ? "primary" : ""}/>
            </ListItemIcon>
            <ListItemText
            primary="Home"
            >
            </ListItemText>
            </ListItem>
            </Tooltip>
            <Tooltip
            disableHoverListener={open}
            placement="right"
            title="Territories"
            >
            <ListItem button component={Link} to="/territories">
            <ListItemIcon
            >
                <LandscapeIcon color={location.pathname.startsWith("/territories") ? "primary" : ""}/>
            </ListItemIcon>
            <ListItemText
            primary="Territories"
            >
            </ListItemText>
            </ListItem>
            </Tooltip>

            <Tooltip
            disableHoverListener={open}
            placement="right"
            title="Departments"
            >
            <ListItem button component={Link} to="/departments">
            <ListItemIcon
            >
                <AccountBalanceIcon color={location.pathname.startsWith("/departments") ? "primary" : ""}/>
            </ListItemIcon>
            <ListItemText
            primary="Departments"
            >
            </ListItemText>
            </ListItem>
            </Tooltip>

            <Tooltip
            disableHoverListener={open}
            placement="right"
            title="Supervisors"
            >
            <ListItem button component={Link} to="/supervisors">
            <ListItemIcon
            >
                <SupervisorAccountIcon color={location.pathname.startsWith("/supervisors") ? "primary" : ""}/>
            </ListItemIcon>
            <ListItemText
            primary="Supervisors"
            >
            </ListItemText>
            </ListItem>
            </Tooltip>

            <Tooltip
            disableHoverListener={open}
            placement="right"
            title="Agents"
            >
            <ListItem button component={Link} to="/agents">
            <ListItemIcon
            >
                <PersonIcon color={location.pathname.startsWith("/agents") ? "primary" : ""}/>
            </ListItemIcon>
            <ListItemText
            primary="Agents"
            >
            </ListItemText>
            </ListItem>
            </Tooltip>
            <Tooltip
            disableHoverListener={open}
            placement="right"
            title="Products"
            >
            <ListItem button component={Link} to="/products">
            <ListItemIcon
            >
                <ShoppingCartIcon color={location.pathname.startsWith("/products") ? "primary" : ""}/>
            </ListItemIcon>
            <ListItemText
            primary="Products"
            >
            </ListItemText>
            </ListItem>
            </Tooltip>

            <Tooltip
            disableHoverListener={open}
            placement="right"
            title="Customers"
            >
            <ListItem button component={Link} to="/customers">
            <ListItemIcon
            >
                <AssignmentIndIcon color={location.pathname.startsWith("/customers") ? "primary" : ""}/>
            </ListItemIcon>
            <ListItemText
            primary="Customers"
            >
            </ListItemText>
            </ListItem>
            </Tooltip>
            <Tooltip
            disableHoverListener={open}
            placement="right"
            title="Tasks"
            >
            <ListItem button component={Link} to="/tasks">
            <ListItemIcon
            >
              <AssignmentLateIcon color={location.pathname === "/tasks" ? "primary" : ""}/>
            </ListItemIcon>
            <ListItemText
            primary="Tasks"
            >
            </ListItemText>
            </ListItem>
            </Tooltip>
            <Tooltip
            disableHoverListener={open}
            placement="right"
            title="Schedules"
            >
            <ListItem button component={Link} to="/schedules">
            <ListItemIcon
            >
                <ScheduleIcon color={location.pathname === "/schedules" ? "primary" : ""}/>
            </ListItemIcon>
            <ListItemText
            primary="Schedules"
            >
            </ListItemText>
            </ListItem>
            </Tooltip>
            <Tooltip
            disableHoverListener={open}
            placement="right"
            title="Visit Reports"
            >
            <ListItem button component={Link} to="/reports">
            <ListItemIcon
            >
                <ReportIcon color={location.pathname === "/reports" ? "primary" : ""}/>
            </ListItemIcon>
            <ListItemText
            primary="Reports"
            >
            </ListItemText>
            </ListItem>
            </Tooltip>
        </List>
        <div className={classes.toggleContainer}>
          <Tooltip
          placement="top"
          title={open ? "minimize" : "expand"}
          >
            <IconButton onClick={open ? () => handleDrawerClose(): () => handleDrawerOpen()}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          </Tooltip>
        </div>
      </Drawer>
    </>
  );
}

export default React.memo(MiniVariantDrawer);