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

//Icons
import AddIcon from '@material-ui/icons/Add';

//redux
import { connect } from 'react-redux';
import { clearErrors, addTerritory } from '../../redux';

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
    territories: state.data.territories
})

const mapDispatchToProps = dispatch => ({
    addTerritory: territoryInfo => dispatch(addTerritory(territoryInfo)),
    clearErrors: () => dispatch(clearErrors()),
});

const AddTerritoryDialog = ({ addTerritory, clearErrors, classes, UI, territories }) => {
    
    const [open, setOpen] = React.useState(false);
    const [territoryInfo, setTerritoryInfo] = React.useState({
        name: '',
        description: '',
        region: '',
    });

    //when the territories increase, it means a request to the backend was successful
    React.useEffect(() => {
        setOpen(false);
        setTerritoryInfo({
            name: '',
            description: '',
            region: '',
        });
        clearErrors();
    }, [territories]);

    //callbacks
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        clearErrors();
        setOpen(false);
    }

    const handleSubmit = () => {
        addTerritory(territoryInfo);
    }

    const handleChange = event => {
        clearErrors();
        setTerritoryInfo({
            ...territoryInfo,
            [event.target.name] : event.target.value,
        })
    }
    return (
        <>    
        <Tooltip title="Add New Territory">
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
                Add A New Territory
            </DialogTitle>
            <DialogContent
            >
                <form noValidate>
                <TextField
                name="name"
                type="text"
                value={territoryInfo.name}
                onChange={handleChange}
                label="Name"
                placeholder="Name"
                error={UI.errors && !!UI.errors.name}
                helperText={UI.errors && UI.errors.name}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="description"
                type="text"
                value={territoryInfo.description}
                onChange={handleChange}
                label="Description"
                placeholder="Description"
                error={UI.errors && !!UI.errors.description}
                helperText={UI.errors && UI.errors.description}
                className={classes.textField}
                fullWidth
                />
                <TextField
                name="region"
                type="text"
                value={territoryInfo.region}
                onChange={handleChange}
                label="Region"
                placeholder="Region"
                error={UI.errors && !!UI.errors.description}
                helperText={UI.errors && UI.errors.description}
                className={classes.textField}
                fullWidth
                />
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
                disabled={UI.loading}
                >Add {
                    UI.loading && <CircularProgress size={30} className={classes.spinner}/>
                }</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
)(withStyles(styles)(React.memo(AddTerritoryDialog)));
