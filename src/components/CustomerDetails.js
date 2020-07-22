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
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

//Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PublicIcon from '@material-ui/icons/Public';
import PollIcon from '@material-ui/icons/Poll';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

//redux
import {editCustomer} from '../redux';
import {connect} from 'react-redux';

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
    },
    spinner: {
        position: 'absolute',
    }
});

const mapStateToProps = state => ({
    loading: state.UI.loading,
    customer: state.customersData.customer,
});

const mapDispatchToProps = dispatch => ({
    editCustomer: (newInfo, customer_id) => dispatch(editCustomer(newInfo, customer_id)),
});

const CustomerDetails = ({classes, customer, editCustomer, loading}) => {
    dayjs.extend(relativeTime);

    const {image_url, potential, phone_number, town, county, status, approval_status, email, address, name, document_id, g, l} = customer;
    // const [status, setStatus] = React.useState(() => status);
    // const [approvalStatus, setApprovalStatus] = React.useState(() => approvalStatus);

    const activateOrDiactivate = () => {
        if(status === 'active') return editCustomer({status: 'disabled'}, document_id);
        return editCustomer({status: 'active'}, document_id);
    }

    return (
        <Card className={classes.detailsContainer}>
                    <CardContent className={classes.infoContainer}>
                        <Typography vairant="body2" color="textSecondary" className={classes.lightTitle}>
                            <i>From {address} address, {status}, location info {g && l ? 'available' : 'not available'} </i>
                        </Typography>
                        <div className={classes.item}>
                            <Avatar src={image_url} alt="Customer"/> <span className={classes.note}>Name <strong>{name}</strong></span>
                        </div>
                        <div className={classes.item}>
                            <EmailIcon color="primary" /> <span className={classes.note}> Mail <strong>{email}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <PhoneIcon color="primary" /> <span className={classes.note}> Phone <strong>{phone_number}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <LocationOnIcon color="primary" /> <span className={classes.note}> Town <strong>{town}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <ThumbUpIcon color={approval_status === "approved" ? "primary" : "secondary"} /> <span className={classes.note}> Approval Status <strong>{approval_status}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <PublicIcon color="primary" /> <span className={classes.note}> County <strong>{county}</strong> </span>
                        </div>
                        <div className={classes.item}>
                            <PollIcon color="primary" /> <span className={classes.note}> Potential <strong>{potential}</strong> </span>
                        </div>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/customers"
                        >Back</Button>
                        {
                            g && l && approval_status === 'approved' &&
                            (
                                <Button
                                variant="contained"
                                color={status === 'active' ? 'secondary' : 'primary'}
                                onClick={activateOrDiactivate}
                                disabled={loading}
                                >{status === 'active' ? 'Disable' : 'Activate'}{loading && <CircularProgress size={30} className={classes.spinner}/>}</Button>
                            )
                        }
                    </CardActions>
                </Card>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(CustomerDetails)));
