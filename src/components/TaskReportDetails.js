import React from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

//Icons
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MoreIcon from '@material-ui/icons/More';

const styles = theme => ({
    detailsContainer: {
        marginBottom: 10,
    },
    infoContainer: {
        position: 'relative',
        marginBottom: 10,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    lightTitle: {
        position: 'absolute',
        right: 10,
        marginBottom: 20,
        [theme.breakpoints.down("md")]: {
            display: 'none'
        }
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
        width: '40%',
    },
    note: {
        marginLeft: 20,
    }
});

const TaskReportDetails = ({classes, report, handleClose}) => {
    dayjs.extend(relativeTime);

    const { assigned_by, agent_id, task_name, description, start_time, end_time, status, number_of_actions, completed_action_ids, department_name, proximity_in_meters } = report;
    return (
        <Card className={classes.detailsContainer}>
                    <CardContent className={classes.infoContainer}>
                        <Typography vairant="body2" color="textSecondary" className={classes.lightTitle}>
                            <i>{assigned_by === agent_id ? "This task was self assigned" : "This task was assigned by the office"}</i>
                        </Typography>
                        <div className={classes.item}>
                            <AssignmentIcon color="primary" /> <span className={classes.note}>Task Name <strong>{task_name}</strong></span>
                        </div>
                        <div className={classes.item}>
                            <MoreIcon color="primary" /> <span className={classes.note}> Description <strong>{description}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <span className={classes.note}>Started <strong>{dayjs(start_time._seconds * 1000).fromNow()} </strong></span>
                            {end_time ? <span className={classes.note}>Ended <strong>{dayjs(end_time._seconds * 1000).fromNow()} ({status})</strong> </span> : <span>Still in Progress</span> }     
                        </div>
                        <div className={classes.item}>
                            <AccountBalanceIcon color="primary" /> <span className={classes.note}> Department <strong>{department_name}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <Looks3Icon color="primary" /> <span className={classes.note}> Number of Actions <strong>{number_of_actions}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <Looks4Icon color="primary" /> <span className={classes.note}> Completed Actions <strong>{completed_action_ids ? completed_action_ids.length : 0}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <DonutLargeIcon color="primary" /> <span className={classes.note}> Percentage Complete <strong>{completed_action_ids ? completed_action_ids.length / number_of_actions * 100 : 0}%</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <AddLocationIcon color="primary" /> <span className={classes.note}> Proximity <strong>{proximity_in_meters} meters</strong> </span>
                        </div>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose}
                        >Back</Button>
                    </CardActions>
                </Card>
    )
}

export default withStyles(styles)(React.memo(TaskReportDetails));
