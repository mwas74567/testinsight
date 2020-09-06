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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import EditCustomerTerritoryDialog from './dialogs/EditCustomerTerritoryDialog';
import ActivateDialog from './dialogs/ActivateDialog';

//Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PublicIcon from '@material-ui/icons/Public';
import PollIcon from '@material-ui/icons/Poll';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

//redux
import {editCustomer,getTerritories, getCustomers} from '../redux';
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


    const {image_url, potential, phone_number, town, county, status, approval_status,territory_id, email, address, name, document_id, g, l, territory_name} = customer;
    const activate = () => {
  
        editCustomer({status: 'active'}, customer.document_id);
    }
    
    const inactivate = () => {
        
        editCustomer({status: 'inactive'}, customer.document_id);
    }
    const activateApproval = () => {
        editCustomer({approval_status: 'approved'}, customer.document_id);
    }
    
    const inactivateApproval = () => {
        editCustomer({approval_status: 'unapproved'}, customer.document_id);
    }
  
    // const [status, setStatus] = React.useState(() => status);
    // const [approvalStatus, setApprovalStatus] = React.useState(() => approvalStatus);

    // const activateOrDiactivate = () => {
    //     if(status === 'active') return editCustomer({status: 'disabled'}, document_id);
    //     return editCustomer({status: 'active'}, document_id);
    // }
    // const inactivate = () => {
    //     if(status === 'active') return editCustomer({status: 'disabled'}, document_id);
    //     return editCustomer({status: 'active'}, document_id);
    // }
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
                        {
                             (!status || status === 'inactive' ) ?
                             (<div className={classes.item}>
                                <PollIcon color="primary" /> <span className={classes.note}> Territory <strong>{territory_name}</strong> </span>
                            </div>)
                            :
                            (
                             <div className={classes.item}>
                               <PollIcon color="primary" /> <span className={classes.note}> Territory <strong>{territory_name === undefined ? 'No territory' : territory_name}</strong> </span>
                                <EditCustomerTerritoryDialog
                                   title="Change Territory"
                                     label="Change Territory"
                                     infoKey="territory_id"
                                     type="text"
                                     />
                            </div>
                            )
                          
                        }
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
                            (approval_status === 'approved') ?
                            (
                                (!status || status === 'inactive' || territory_name === undefined ) ?
                            (
                                // <Button
                                // color="primary"
                                // variant="contained"
                                // onClick={activate}
                                // >ACTIVATE</Button>
                                 
                                <ActivateDialog
                                dialogTitle =" Customer Activation Dialog"
                                buttonTitle="ACTIVATE"
                                buttonColor="primary"
                                actionFunction ={activate}
                               />
                            ) : (
                                <Button
                                color="secondary"
                                variant="contained"
                                onClick={inactivate}
                                >DEACTIVATE</Button>
                            )
                            ):
                            (
                              <Button variant="contained" disabled>
                                PENDING APPROVAL
                              </Button> 
                            )

                            
                        }
                        {
                            (!approval_status || approval_status === 'unapproved') ?
                            (
                                <Button
                                color="primary"
                                variant="contained"
                                onClick={activateApproval}
                                >APPROVE</Button>
                            ) : (
                                <Button
                                color="secondary"
                                variant="contained"
                                onClick={inactivateApproval}
                                >UNAPPROVE</Button>
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
