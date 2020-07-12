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
import AddLocationIcon from '@material-ui/icons/AddLocation';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ContactsIcon from '@material-ui/icons/Contacts';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PersonIcon from '@material-ui/icons/Person';

const styles = theme => ({
    detailsContainer: {
        marginBottom: 10,
    },
    infoContainer: {
        position: 'relative',
        marginBottom: 10,
        padding: 5,
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
        flexDireaction: 'row',
        margin: 10
    },
    note: {
        marginLeft: 20,
    }
});

const CheckInSummaryDetails = ({classes, report, handleClose}) => {
    dayjs.extend(relativeTime);

    const { visit_date, agent_name, customer_name, customer_address, department_name, first_check_in_time, last_check_in_time, status, number_of_check_ins, number_of_tasks, proximity_in_meters } = report;
    return (
        <Card className={classes.detailsContainer}>
                    <CardContent className={classes.infoContainer}>
                        <Typography vairant="body2" color="textSecondary" className={classes.lightTitle}>
                            <i>{dayjs(visit_date._seconds * 1000).format('h: mm a, MMMM DD YYYY')}</i>
                        </Typography>
                        <div className={classes.item}>
                            <PersonIcon color="primary" /> <span className={classes.note}>Agent <strong>{agent_name}</strong></span>
                        </div>
                        <div className={classes.item}>
                            <AssignmentIndIcon color="primary" /> <span className={classes.note}> Customer <strong>{customer_name}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <ContactsIcon color="primary" /> <span className={classes.note}> Customer Address <strong>{customer_address}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <AccountBalanceIcon color="primary" /> <span className={classes.note}> Department <strong>{department_name}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <span className={classes.note}>First Check In <strong>{dayjs(first_check_in_time._seconds * 1000).fromNow()} </strong></span>
                            {last_check_in_time ? <span className={classes.note}>Last Check In <strong>{dayjs(last_check_in_time._seconds * 1000).fromNow()} ({status})</strong> </span> : <span>Still in Progress</span> }     
                        </div>
                        
                        <div className={classes.item}>
                            <Looks3Icon color="primary" /> <span className={classes.note}> Number of Check Ins <strong>{number_of_check_ins}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <Looks4Icon color="primary" /> <span className={classes.note}> Number of Tasks <strong>{number_of_tasks}</strong> </span>
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

export default withStyles(styles)(React.memo(CheckInSummaryDetails));
