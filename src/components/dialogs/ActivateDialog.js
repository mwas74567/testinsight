import React from 'react'


//MUI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

// redux
import { getTerritories, editCustomer} from '../../redux';
import { connect } from 'react-redux';






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
    },
   
    trigger: {
        margin: 10,
    },
});


const mapStateToProps = state => ({   
    UI: state.UI,
    territories: state.territoriesData.territories,
    customer: state.customersData.customer,
})
const mapDispatchToProps = dispatch => ({
    getTerritories: () => dispatch(getTerritories()),
    editCustomer: (newInfo, customer_id) => dispatch(editCustomer(newInfo, customer_id))
});

const ActivateDialog= ({dialogTitle, actionFunction,buttonTitle, buttonColor, classes,UI, getTerritories, territories, customer, editCustomer,message}) => {

    
    const [open, setOpen] = React.useState(false);
    const [territoryInfo, setTerritoryInfo] = React.useState({
        territory_id: '',
        territory_name: '',
    });

 
    React.useEffect(() => {
        if(open && territories.length === 0) getTerritories();
    }, [open]);

    // Test This
    

    React.useEffect(() => {
        //map redux state to component state
        if(open){
            setTerritoryInfo({
                territory_id: customer.territory_id,
                territory_name: customer.territory_name,
            })
        }   
    }, [open]);
  
    const handleClose= ()=>{
        setOpen(false);
    
    }
    const handleOpen = () => {
        setOpen(true);
    }
    const handleChange = event => {
        let targetTerritory;
        territories.forEach(
            (territory, index) => {
                if(territory.document_id === event.target.value) targetTerritory = territory;
            }
        );
        setTerritoryInfo({
            territory_id: targetTerritory.document_id,
            territory_name: targetTerritory.name,
        });
    }

 

    const handleSubmit= ()=>{
        
        if(territoryInfo.territory_id === customer.territory_id){   
            actionFunction();
            return;
        }
        if(territoryInfo.territory_id.trim() !== ''){
           
            editCustomer(territoryInfo, customer.document_id);
            console.log('yes Territory');
        }
        else{
            
            message = '<div color="secondary">Select a territory</div>'
            console.log('no Territory');
        }
       
        // editTerritory(territoryInfo);
        actionFunction();
        handleClose()
    
    }
 
    return (
       <>
          <Button
        variant="contained"
        color={buttonColor}
        onClick={handleOpen}
        className={classes.trigger}
    >{buttonTitle}</Button>
    
        <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>
             {dialogTitle}
            </DialogTitle>
            <DialogContent
            >
                <form noValidate>
                  
                <TextField
                name="territory_id"
                id="selected-territory"
                select
                label="Territory"
                value={territoryInfo.territory_id}
                onChange={handleChange}
                error={message}
                helperText={message}
                className={classes.textField}
                fullWidth
                >
                {
                    (territories.length === 0) ?
                    <Typography variant="body1">please wait...</Typography> :
                    (
                        territories.map(territory => (
                            <MenuItem key={territory.document_id} value={territory.document_id}>
                            {territory.name}
                            </MenuItem>
                        ))
                    )
                }
                </TextField>
                  
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
                >CONTINUE</Button>
            </DialogActions>
        </Dialog>

       </>
    )
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
)(withStyles(styles)(React.memo(ActivateDialog)));


