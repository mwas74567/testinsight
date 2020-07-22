import React from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import EditDepartmentDialog from './dialogs/EditDepartmentDialog';

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

//redux
import { connect } from 'react-redux';
import {editDepartment} from '../redux';

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

const mapStateToProps = state => ({
    department: state.departmentsData.department,
});

const mapDispatchToProps = dispatch => ({
    editDepartment: (newInfo, id) => dispatch( editDepartment(newInfo, id)),
});

const DepartmentDetails = ({classes, department, editDepartment}) => {
    dayjs.extend(relativeTime);

    const { name, description, status  } = department;

    const activate = () => {
        editDepartment({status: 'active'}, department.document_id);
    }

    const inactivate = () => {
        editDepartment({status: 'inactive'}, department.document_id);
    }
    
    return (
        <Card className={classes.detailsContainer}>
                    <CardContent className={classes.infoContainer}>
                        <Typography vairant="body2" color="textSecondary" className={classes.lightTitle}>
                            <i>status: {status}</i>
                        </Typography>
                        <div className={classes.item}>
                            <AccountBalanceIcon color="primary" /> <span className={classes.note}> Name <strong>{name}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <MoreIcon color="primary" /> <span className={classes.note}> Description <strong>{description}</strong> </span>
                        </div>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/departments"
                        >Back</Button>
                        <EditDepartmentDialog oldInfo={department} id={department.document_id}/>
                        {
                            (!status || status === 'inactive') ?
                            (
                                <Button
                                color="primary"
                                variant="contained"
                                onClick={activate}
                                >Activate</Button>
                            ) : (
                                <Button
                                color="secondary"
                                variant="contained"
                                onClick={inactivate}
                                >Diactivate</Button>
                            )
                        }
                    </CardActions>
                </Card>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(DepartmentDetails)));
