import React from 'react';

//MUI
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';

//Icons
import AddIcon from '@material-ui/icons/Add';

//redux
import { connect } from 'react-redux';
import { clearErrors, addCustomer, getTerritories } from '../../redux';

const styles = theme => ({
    textField: {
        margin: '10px auto 10px auto',
    },
    error: {
        color: 'red',
        fontSize: '.8rem',
        marginTop: '5px',
    },
    spinner: {
        position: 'absolute',
    }
});

const mapStateToProps = state => ({
    UI: state.UI,
    customers: state.data.customers,
    territories: state.data.territories,
    loading: state.data.loading,
})

const mapDispatchToProps = dispatch => ({
    getTerritories: () => dispatch(getTerritories()),
    addCustomer: customerInfo => dispatch(addCustomer(customerInfo)),
    clearErrors: () => dispatch(clearErrors()),
});

const AddCustomerDialog = ({ addCustomer, clearErrors, classes, UI, customers, territories, loading, getTerritories }) => {
    
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        if(open && territories.length === 0) getTerritories();
    }, [open]);
    const [customerInfo, setCustomerInfo] = React.useState({
        name: '',
        email: '',
        phone_number: '',
        address: '',
        county: '',
        town: '',
        institution_type: '',
        territory_id: '',
    });

    //when the customers increase, it means a request to the backend was successful
    React.useEffect(() => {
        setOpen(false);
        setCustomerInfo({
            name: '',
            email: '',
            phone_number: '',
            address: '',
            county: '',
            town: '',
            institution_type: '',
            territory_id: '',
        });
        clearErrors();
    }, [customers]);

    //data not loading effect
    React.useEffect(() => {
        if(
            !loading &&
            UI.errors &&
            Object.keys(UI.errors).length === 0
        ){
            setOpen(false);
            setCustomerInfo({
                name: '',
                email: '',
                phone_number: '',
                address: '',
                county: '',
                town: '',
                institution_type: '',
                territory_id: '',
            });
            clearErrors();
        }
    })

    //callbacks
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        if(!loading) {
            clearErrors();
            setOpen(false);
        }
    }

    const handleSubmit = () => {
        addCustomer(customerInfo);
    }

    const handleChange = event => {
        clearErrors();
        setCustomerInfo({
            ...customerInfo,
            [event.target.name] : event.target.value,
        })
    }
    return (
        <>    
        <Tooltip title="Add New Customer">
            <IconButton onClick={handleOpen}>
                <AddIcon style={{color: '#fff'}}/>
            </IconButton>
        </Tooltip>    
        <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>
                Add A New Customer
            </DialogTitle>
            <DialogContent
            >
                <form noValidate>
                <TextField
                name="name"
                type="text"
                value={customerInfo.name}
                onChange={handleChange}
                label="Name"
                placeholder="Name"
                error={UI.errors && !!UI.errors.name}
                helperText={UI.errors && UI.errors.name}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="email"
                type="email"
                value={customerInfo.email}
                onChange={handleChange}
                label="Email"
                placeholder="Email"
                error={UI.errors && !!UI.errors.email}
                helperText={UI.errors && UI.errors.email}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="phone_number"
                type="number"
                value={customerInfo.phone_number}
                onChange={handleChange}
                label="Phone Number"
                placeholder="Phone Number"
                error={UI.errors && !!UI.errors.phone_number}
                helperText={UI.errors && UI.errors.phone_number}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="address"
                type="text"
                value={customerInfo.address}
                onChange={handleChange}
                label="Address"
                placeholder="Address"
                error={UI.errors && !!UI.errors.address}
                helperText={UI.errors && UI.errors.address}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="county"
                type="text"
                value={customerInfo.county}
                onChange={handleChange}
                label="County"
                placeholder="County"
                error={UI.errors && !!UI.errors.county}
                helperText={UI.errors && UI.errors.county}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="town"
                type="text"
                value={customerInfo.town}
                onChange={handleChange}
                label="Town"
                placeholder="Town"
                error={UI.errors && !!UI.errors.town}
                helperText={UI.errors && UI.errors.town}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="institution_type"
                type="text"
                value={customerInfo.institution_type}
                onChange={handleChange}
                label="Institution Type"
                placeholder="Institution Type"
                error={UI.errors && !!UI.errors.institution_type}
                helperText={UI.errors && UI.errors.institution_type}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="territory_id"
                id="selected-territory"
                select
                label="Territory"
                value={customerInfo.territory_id}
                onChange={handleChange}
                error={UI.errors && !!UI.errors.territory_id}
                helperText={UI.errors && UI.errors.territory_id}
                className={classes.textField}
                fullWidth
                >
                {
                    (loading && territories.length === 0) ?
                    <MenuItem value="">
                    please wait...
                    </MenuItem>:
                    (
                        territories.map(territory => (
                            <MenuItem key={territory.document_id} value={territory.document_id}>
                            {territory.name}
                            </MenuItem>
                        ))
                    )
                }
                </TextField>
                {
                    UI.errors && UI.errors.error && <Typography 
                    variant="body2"
                    className={classes.error}
                    >{UI.errors.error}</Typography>
                }
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                color="secondary"
                variant="contained"
                onClick={handleClose}
                >CANCEL</Button>
                <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
                disabled={loading || territories.length === 0}
                >Add {
                    loading && territories.length !==0 && <CircularProgress size={30} className={classes.spinner}/>
                }</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
)(withStyles(styles)(React.memo(AddCustomerDialog)));
