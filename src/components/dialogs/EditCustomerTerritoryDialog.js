import React from 'react';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

//Icons
import EditIcon from '@material-ui/icons/Edit';

//Redux
import { connect } from 'react-redux';
import { editCustomer, getTerritories } from '../../redux';

const styles = {
    textField: {
        margin: '10px auto 10px auto',
    },
}

const mapStateToProps = state => ({
    territories: state.territoriesData.territories,    
    customer: state.customersData.customer,
    loading: state.UI.loading,
    errors: state.UI.errors,
});

const mapDispatchToProps = dispatch => ({
    getTerritories: () => dispatch(getTerritories()),
    editCustomer: (newInfo, customer_id) => dispatch(editCustomer(newInfo, customer_id)),
});

const EditCustomerTerritoryDialog = ({ classes, infoKey, title, label, customer,  editCustomer, territories, getTerritories }) => {

    const [open, setOpen] = React.useState(false);
    const [entity, setEntity] = React.useState('');
    const [territory_name, setTerritoryName] = React.useState('');

    React.useEffect(() => {
        if(open && territories.length === 0) getTerritories();
    }, [open]);
 


    React.useEffect(() => {
        //map redux state to component state
        if(open){
            setEntity(customer[infoKey]);
        }   
    }, [open]);

    React.useEffect(() => {
        territories.forEach(territory => {
            if(territory.document_id === entity) setTerritoryName(territory.name);
        });
    }, [entity]);


    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = event => {
        setEntity(event.target.value);
    }

    const handleSubmit = () => {
        if(entity === customer[infoKey] || entity.trim() === ''){
            handleClose();
            return;
        }
        if(entity.trim() !== ''){
            const newInfo = {
                [infoKey] : entity,
                territory_name,
            }
            editCustomer(newInfo, customer.document_id);
        }
    }

    return (
        <>
             <Tooltip
            title={title}
            placement="top"
            onClick={handleOpen}
            >
                <IconButton
                ><EditIcon color="primary"/></IconButton>
            </Tooltip>
            <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            >
                <DialogTitle
                >{title}</DialogTitle>
                <DialogContent>
                    <form noValidate>
                        {
                            infoKey === "territory_id" &&
                            <TextField
                            name={infoKey}
                            id="selected-territory"
                            select
                            label="Territory"
                            value={entity}
                            onChange={handleChange}
                            error={entity.trim() === ''}
                            helperText={entity.trim() === '' && "Cannot be empty"}
                            className={classes.textField}
                            fullWidth
                            >
                            {territories.map(territory => (
                                <MenuItem key={territory.document_id} value={territory.document_id}>
                                {territory.name}
                                </MenuItem>
                            ))}
                            
                            </TextField>  
                              }                     
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                    onClick={handleClose}
                    variant="contained"
                    color="secondary"
                    >Cancel</Button>
                    <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    >Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(React.memo(EditCustomerTerritoryDialog)));